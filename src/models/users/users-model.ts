import {dbConfig} from "../../data/dbConfig";

export interface IUser {
    username: string;
    password: string;
}

export function findById(id: number) {
    return dbConfig("users")
        .where({id})
        .select("username", "id")
        .first();
}

export async function createUser(user: IUser) {
    const [id] = await dbConfig("users").insert(user);
    return findById(id);
}

export function getUsers() {
    return dbConfig("users").select("id", "username");
}

export function findBy(filter:any) {
    return dbConfig("users")
        .select("id", "username", "password")// selecting password because I need it to compare hashes in my middleware
        .where({filter});
}