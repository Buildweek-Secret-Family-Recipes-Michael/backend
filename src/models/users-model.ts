import {dbConfig} from "../data/dbConfig";
import uuid from "uuid-1345";

export interface IUser {
    username: string;
    password: string;
    id?: string;
}

export function findById(id: string) {
    return dbConfig("users")
        .where({id})
        .select("username", "id")
        .first();
}

export async function createUser(user: IUser) {
    const id = uuid.v4();
    const newUser = {
        ...user,
        id
    };
    await dbConfig("users").insert(newUser);
    const newCreatedUser = await findById(id);
    return newCreatedUser;//todo: this is coming back as undefined. But it is being added to the testing db, so my environment is set up properly, but there is a problem somewhere
}

export async function updateUser(user: IUser) {
    const id:any = user.id;
    await dbConfig("users").update(user).where("id", id);
    return findById(id);
}

export function getUsers() {
    return dbConfig("users").select("id", "username");
}

export function findBy(filter:Partial<IUser>) {
    return dbConfig("users")
        .where(filter);
}

//todo: write delete endpoint and method