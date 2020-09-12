import {server} from "../../server";
import * as usersModel from "../models/users-model";
import {dbConfig} from "../data/dbConfig";
import supertest from "supertest";


beforeEach(async () => {
    await dbConfig.seed.run();
});

afterAll(async () => {
    await dbConfig.destroy();
});


describe("Creates a new user",  () => {
    describe("When valid new user info is provided", () =>{
        it("Receives the created user info from the server", async () =>{
            const newUser = {username: "eevee", password:"$2a$13$h/OXxNKcj4E4ZF1KO5Uzhuh/b38Q57Bh5crgmMA4IgqaSz8rG9mG2"};
        });
    });
});