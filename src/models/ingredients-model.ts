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
        .select("amount", "name", "id")
        .first();
}

/*
Notes to self on how to improve the performance of this function:
Instead of looping through and hitting the db each time to insert, I could loop through each ingredient, create the ids and other extra data I may need,
then insert all of them in one shot as an array, that would decrease the db inserts from o(n) to o(1);
 */
export async function createIngredient(ingredient: IIngredient, recipeId: string) {//recipeId is a separate param because when creating a recipe the id is unknown when the endpoint is hit
    const ingExists = await findBy({name: ingredient.name}, {amount: ingredient.amount}).first();
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

export async function createIngredients(ingredients:IIngredient[], recipeId:string) {
    //this is a middle man

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
    // const ingredientIds: any[] = await dbConfig("recipes_ingredients").select("ingredientId").where({recipeId});
    //
    // let ingredients = [];
    // for(let i = 0; i < ingredientIds.length; i++){
    //     ingredients.push(await findById(ingredientIds[i].ingredientId)
    //         .then((res:any) =>{
    //             return res;
    //         }));
    // }
    // return ingredients;

    //duh, table joins xD
    return dbConfig("recipes_ingredients as ri")
        .join("ingredients as i", "i.id", "ri.ingredientId")
        .where("ri.recipeId", recipeId)
        .select("i.amount", "i.name", "i.id");
}

export async function deleteIngredient(id: string) {
    const ingredient = await findBy({id}).first();
    const changes = await dbConfig("ingredients").del().where({id});
    if (!changes) throw new Error("Did not delete ingredient!");
    return ingredient;
}