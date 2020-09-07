import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";

export interface IRecipe {
    name: string;
    id?: string;
    userId: string;
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

export async function createRecipe(recipe: IRecipe) {
    const newRecipe = {
        ...recipe,
        id: uuid.v4()
    };
    const [id] = await dbConfig("recipes").insert(newRecipe).returning("id");
    return findById(id);

}

export async function updateRecipe(recipe: IRecipe) {
    const id: any = recipe.id;
    await dbConfig("recipes").insert(recipe).where({id});
    return findById(id);
}

export function getRecipes() {
    // todo: this function should only be called from a route protected by and admin account
    return dbConfig("recipes");
}

export function findBy(filter: any) {
    return dbConfig("recipes")
        .select("id", "name", "userId")
        .where({filter})
        .first();
}