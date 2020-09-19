import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";
import * as ingredientsModel from "./ingredients-model";
import * as instructionsModel from "./instructions-model";
import {IIngredient} from "./ingredients-model";
import {IInstruction} from "./instructions-model";
import {redisClient} from "../data/cache/cache";

export interface IRecipe {
    name: string;
    id?: string;
    userId: string;
    category: string;

    instructions?: IInstruction[];
    ingredients?: IIngredient[];
}

export async function findById(id: string) {
    const recipe = await dbConfig("recipes")
        .where({id})
        .select("name", "category", "userId")
        .first();
    const ingredients = await ingredientsModel.findRecipeIngredients(id);
    const instructions = await instructionsModel.findRecipeInstructions(id);

    return {...recipe, ingredients, instructions};
}

export function findByUserId(userId: string) {
    return dbConfig("recipes")
        .where({userId})
        .select("id", "name", "category");
}

export async function createRecipe(recipe: IRecipe) {
    const recipeId = uuid.v4();
    const {name, userId, category} = recipe;
    const newRecipe = {
        name,
        userId,
        category,
        id: recipeId
    };

    await dbConfig("recipes").insert(newRecipe);
    await dbConfig("users_recipes").insert({recipeId, userId: recipe.userId});//create join table entry

    //if ingredients were provided, map over that array and create each ingredient using the ingredients model

    /*
    for(let i = 0; i < ingredientIds.length; i++){
        ingredients.push(await findById(ingredientIds[i].ingredientId)
            .then((res:any) =>{
                return res;
            }));
    }
     */

    if (recipe.ingredients) {
        if (recipe.ingredients.length > 0) {
            for (let i = 0; i < recipe.ingredients.length; i++) {
                await ingredientsModel.createIngredient(recipe.ingredients[i], recipeId);
            }
        }

        // recipe.ingredients.forEach(ingredient => {
        //     ingredientsModel.createIngredient(ingredient, recipeId);
        // });
    }

    if (recipe.instructions) {
        if (recipe.instructions.length > 0) recipe.instructions.forEach((instruction) => {
            instructionsModel.createInstruction(instruction, recipeId);
        });
    }

    return findById(recipeId);//todo: get instructions
}

export async function updateRecipe(recipe: IRecipe) {
    //todo: this needs to be completely rewritten
    if (!recipe.id) throw new Error("No recipe id provided");

    const id: string = recipe.id;
    if (recipe.ingredients?.length! > 0) recipe.ingredients?.forEach(ingredient => ingredientsModel.createIngredient(ingredient, id));
    await dbConfig("recipes").insert(recipe).where({id});
    return findById(id);
}

export function getRecipes() {
    // todo: this function should only be called from a route protected by an admin account
    return dbConfig("recipes");
}

export function findBy(filter: any) {
    return dbConfig("recipes")
        .select("id", "name", "userId")
        .where({filter})
        .first();
}

export async function getUserRecipes(userId: string) {
    const collection = "users_recipes";
    const redisHashKey: string = userId;

    //check cache db if this query exists and is not expired
    const cachedRecipes: any = await redisClient.hget(redisHashKey, collection);
    if (cachedRecipes) {
        console.log("Serving from redis", cachedRecipes);
        return JSON.parse(cachedRecipes);
    }


    //if we didn't return yet, that means the recipes are not cached
    const users_recipes = await dbConfig(collection).select("recipeId").where({userId});
    const cachedRecipesExp = 30;//the expiration is in seconds, not millis
    const recipeIds = users_recipes.map((recipeIdObj: { recipeId: string }) => {
        return recipeIdObj.recipeId;
    });

    // for (let i = 0; i < recipeIds.length; i++) {
    //     recipes.push(await findById(recipeIds[i]));
    // }
    const recipes = recipeIds.map((id: string) => {
        return findById(id);
    });

    const resolvedRecipes = await Promise.all(recipes);
    await redisClient.hset(redisHashKey, collection, JSON.stringify(resolvedRecipes), "EX", cachedRecipesExp.toString());
    return resolvedRecipes;
}