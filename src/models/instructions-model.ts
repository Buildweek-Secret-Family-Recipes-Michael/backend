import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";


export interface IInstruction {
    stepNumber: string;
    name: string;
    recipeId: string;
    id?: string;
}

export async function createInstruction(instruction: IInstruction) {
    const id = uuid.v4();

    const {stepNumber, name, recipeId} = instruction;
    const newInstruction ={
        stepNumber,
        name,
        recipeId,
        id
    }

    await dbConfig("instructions").insert(newInstruction);
    return findById(id);
}

export async function findById(id: string) {
    return dbConfig("instructions").where({id}).first();

}