import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";


export interface IInstruction {
    stepNum: string;
    name: string;
    recipeId?: string;
    id?: string;
}

export async function createInstruction(instruction: IInstruction, recipeId: string) {//recipeId passed in as param because it won't be known right away on create recipe
    const id = uuid.v4();

    const {stepNum, name} = instruction;
    console.log(recipeId);
    const newInstruction ={
        stepNum,
        name,
        recipeId,
        id
    }

    await dbConfig("instructions").insert(newInstruction);
    return findById(id);
}

export async function findById(id: string) {
    return dbConfig("instructions")
        .where({id})
        .first();
}

export async function findRecipeInstructions(recipeId: string) {
    return dbConfig("instructions")
        .select("name", "stepNum")
        .where({recipeId})
        .orderBy("stepNum");

}