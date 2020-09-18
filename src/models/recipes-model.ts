import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";
import * as ingredientsDb from "./ingredients-model";
import {IIngredient} from "./ingredients-model";

export interface IRecipe {
    name: string;
    id?: string;
    userId: string;
    category: string;

    instructions?: string[];
    ingredients?: IIngredient[];
}

export async function findById(id: string) {
    const recipe = await dbConfig("recipes")
        .where({id})
        .select("name", "category", "userId")
        .first();
    const ingredients = await ingredientsDb.findRecipeIngredients(id);
    console.log("ingredients", ingredients);

    return {...recipe, ingredients: ingredients};
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

    //if ingredients were provided, map over that array and create each ingredient using the ingredients model

    console.log("ingredients length", recipe.ingredients?.length);
    if(recipe.ingredients) {
        if (recipe.ingredients.length > 0) recipe.ingredients.forEach(ingredient => {
            console.log("ingredient ", ingredient);
            ingredientsDb.createIngredient(ingredient, recipeId);
        });
    }

    await dbConfig("recipes").insert(newRecipe);
    await dbConfig("users_recipes").insert({recipeId, userId: recipe.userId});//create join table entry
    return findById(recipeId);
}

export async function updateRecipe(recipe: IRecipe) {
    if(!recipe.id) throw new Error("No recipe id provided");

    const id: string = recipe.id;
    if(recipe.ingredients?.length! > 0) recipe.ingredients?.forEach(ingredient => ingredientsDb.createIngredient(ingredient, id));
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