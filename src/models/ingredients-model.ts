import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";

//I am NOT including an update function for this endpoint because the ingredients are shared, I don't want one user changing the ingredient for others.
//A user can simply create a new ingredient

export interface IIngredient {
    amount: string;
    name: string;
    recipeId: string;
    id?: string;
}


export function findById(id: string) {
    return dbConfig("ingredients")
        .where({id})
        .select("amount", "name")
        .first();
}

export async function createIngredient(ingredient: IIngredient) {
    const ingExists = await findBy({name: ingredient.name}).first();//todo: Why can't I pass in just ingredient.name
    if (ingExists && ingExists.amount === ingredient.amount) {
        await dbConfig("recipes_ingredients").insert({recipeId: ingredient.recipeId, ingredientId: ingExists.id});
        return findById(ingExists.id);
    }
    const newIngredient = {
        ...ingredient,
        id: uuid.v4(),
    };
    const [id] = await dbConfig("ingredients").insert(newIngredient).returning("id");
    return findById(id);
}

export function findBy(filter: Partial<IIngredient>) {
    return dbConfig("ingredients")
        .where(filter);
}

export async function deleteIngredient(id: string) {
    const ingredient = await findBy({id}).first();
    const changes = await dbConfig("ingredients").del().where({id});
    if (!changes) throw new Error("Did not delete ingredient!");
    return ingredient;
}