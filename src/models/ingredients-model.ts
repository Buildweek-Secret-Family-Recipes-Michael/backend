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
    console.log(ingredient);
    const ingExists = await findBy({name: ingredient.name}, {amount: ingredient.amount}).first();//todo: Why can't I pass in just ingredient.name
    console.log("ing exist", ingExists);
    if (ingExists && (ingExists.amount === ingredient.amount)) {
        if( await findRecipeIngredient(ingredient.recipeId, ingExists.id)) return findById(ingExists.id);
        await dbConfig("recipes_ingredients").insert({recipeId: ingredient.recipeId, ingredientId: ingExists.id});
        return findById(ingExists.id);
    }
    const newIngredient = {//not spreading ingredient because the ingredients table does not include a recipeId column, which is being passed in for the join table
        amount: ingredient.amount,
        name: ingredient.name,
        id: uuid.v4()
    };
    const [id] = await dbConfig("ingredients").insert(newIngredient).returning("id");//if the ingredient doesn't exist then it also needs to be added to the ingredients table

    await dbConfig("recipes_ingredients").insert({recipeId: ingredient.recipeId, ingredientId: newIngredient.id});
    return findById(id);
}

export function findBy(filter: Partial<IIngredient>, filter2?: Partial<IIngredient>) {
    return dbConfig("ingredients")
        .where(filter)
        .where(filter2);
}

export function findRecipeIngredient(recipeId:string, ingredientId:string) {
    return dbConfig("recipes_ingredients")
        .where({recipeId})
        .where({ingredientId})
        .first();
}

export async function deleteIngredient(id: string) {
    const ingredient = await findBy({id}).first();
    const changes = await dbConfig("ingredients").del().where({id});
    if (!changes) throw new Error("Did not delete ingredient!");
    return ingredient;
}