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

export function findById(id: string) {
    return dbConfig("recipes")
        .where({id})
        .select("name", "userId")
        .first();
}

export function findByUserId(userId: string) {
    return dbConfig("recipes")
        .where({userId})
        .select("id", "name");
}

function getRecipeIngredients(recipeId:string) {
    //expects recipeId and NOT userId. This will be a helper function to structure recipe results so we can put recipe instructions, ingredients in the same result

}

export async function createRecipe(recipe: IRecipe) {
    const recipeId = uuid.v4();
    const newRecipe = {
        ...recipe,
        id: recipeId
    };

    //if ingredients were provided, map over that array and create each ingredient using the ingredients model
    if(recipe.ingredients?.length! > 0) recipe.ingredients?.forEach(ingredient => ingredientsDb.createIngredient(ingredient));

    await dbConfig("users_recipes").insert({recipeId, userId: recipe.userId});//create join table entry
    await dbConfig("recipes").insert(newRecipe);
    return findById(recipeId);

}

export async function updateRecipe(recipe: IRecipe) {
    if(!recipe.id) throw new Error("No recipe id provided");

    const id: string = recipe.id;
    if(recipe.ingredients?.length! > 0) recipe.ingredients?.forEach(ingredient => ingredientsDb.createIngredient(ingredient));
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