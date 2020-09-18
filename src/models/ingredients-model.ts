import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";

//I am NOT including an update function for this endpoint because the ingredients are shared, I don't want one user changing the ingredient for others.
//A user can simply create a new ingredient

export interface IIngredient {
    amount: string;
    name: string;
    id?: string;
}


export function findById(id: string) {
    return dbConfig("ingredients")
        .where({id})
        .select("amount", "name")
        .first();
}

export async function createIngredient(ingredient: IIngredient, recipeId: string) {//recipeId is a separate param because when creating a recipe the id is unknown when the endpoint is hit
    const ingExists = await findBy({name: ingredient.name}, {amount: ingredient.amount}).first();//todo: Why can't I pass in just ingredient.name
    if (ingExists && (ingExists.amount === ingredient.amount)) {
        if (await findRecipeIngredient(recipeId, ingExists.id)) return findById(ingExists.id);
        await dbConfig("recipes_ingredients").insert({recipeId: recipeId, ingredientId: ingExists.id});
        return findById(ingExists.id);
    }
    const id = uuid.v4();
    const newIngredient = {//not spreading ingredient because the ingredients table does not include a recipeId column, which is being passed in for the join table
        amount: ingredient.amount,
        name: ingredient.name,
        id
    };
    await dbConfig("ingredients").insert(newIngredient);//if the ingredient doesn't exist then it also needs to be added to the ingredients table

    await dbConfig("recipes_ingredients").insert({recipeId, ingredientId: newIngredient.id});
    return findById(id);
}

export function findBy(filter: Partial<IIngredient>, filter2?: Partial<IIngredient>) {
    const filtered = dbConfig("ingredients")
        .where(filter);
    return filter2 ? filtered.where(filter2) : filtered;
}

export function findRecipeIngredient(recipeId: string, ingredientId: string) {
    return dbConfig("recipes_ingredients")
        .where({recipeId})
        .where({ingredientId})
        .first();
}

export async function findRecipeIngredients(recipeId: string) {
    const ingredientIds: any[] = await dbConfig("recipes_ingredients").select("ingredientId").where({recipeId});

    let ingredients = [];
    for(let i = 0; i < ingredientIds.length; i++){
        ingredients.push(await findById(ingredientIds[i].ingredientId)
            .then((res:any) =>{
                return res;
            }));
    }
    //todo: look into promise.all
    return ingredients;
}

export async function deleteIngredient(id: string) {
    const ingredient = await findBy({id}).first();
    const changes = await dbConfig("ingredients").del().where({id});
    if (!changes) throw new Error("Did not delete ingredient!");
    return ingredient;
}