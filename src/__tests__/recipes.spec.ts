import {server} from "../../server";
import {dbConfig} from "../data/dbConfig";
import supertest from "supertest";
import * as recipesModel from "../models/recipes-model";
import {IRecipe} from "../models/recipes-model";
import arrayContaining = jasmine.arrayContaining;


// * clears db and reseeds it to initial data before each individual test
beforeEach(async () => {
    await dbConfig.migrate.latest();
    return await dbConfig.seed.run();
});
// * closes any database connections after the tests in case it stays open
afterAll(async () => {
    await dbConfig.destroy();
});


describe("Creates a recipe", () => {
    let token: string;
    beforeEach(async () => {
        token = await supertest(server)
            .post("/api/users/login")
            .send({username: "pokemon0", password: "eevee"})
            .then(res => {
                return res.body.token;
            });
    });
    describe("when logged in and recipe contains valid name, userId, and category provided", () => {
        it("receives the new recipe and 200 from the server", async () => {
            const newRecipe: IRecipe = {
                name: "Chicken nuggets",
                userId: "868f632e-dffc-41b0-872b-c612525e5651",
                category: "dinner",
                ingredients: [
                    {amount: "0.5 cups", name: "yumm"},
                    {amount: "1 cup", name: "chicken"},
                    {amount: "2 cups", name: "nuggets"},
                ],
                instructions: [
                    {stepNum: "1", name: "cook chicken"},
                    {stepNum: "2", name: "cook nuggets"},
                    {stepNum: "3", name: "eat, yumm!"}
                ]
            };

            const res = await supertest(server)
                .post("/api/recipes")
                .set("authorization", token)
                .send(newRecipe);

            expect(res.status).toBe(201);
            expect(res.body.name).toBe(newRecipe.name);
            expect(res.body.userId).toBe(newRecipe.userId);
            expect(res.body.category).toBe(newRecipe.category);
            console.log("res ins", res.body.ingredients, "rec ins", newRecipe.ingredients);
            expect(res.body.ingredients).toEqual(newRecipe.ingredients);
            expect(res.body.instructions).toEqual(newRecipe.instructions);
        });
    });

    describe("when logged in and recipe contains valid name and userId", () => {
        it("receives the new recipe and 200 from the server with empty instructions and ingredients", async () => {
            const newRecipe: IRecipe = {
                name: "Chicken nuggets",
                userId: "868f632e-dffc-41b0-872b-c612525e5651",
                category: "dinner"
            };

            const res = await supertest(server)
                .post("/api/recipes")
                .set("authorization", token)
                .send(newRecipe);

            expect(res.status).toBe(201);
            expect(res.body.name).toBe(newRecipe.name);
            expect(res.body.category).toBe(newRecipe.category);
            expect(res.body.ingredients).toStrictEqual([]);
            expect(res.body.instructions).toStrictEqual([]);
        });
    });
    describe("when not logged in", () => {
        it("receives and error message from the server and a 401 unauthorized code", async () => {
            const newRecipe: IRecipe = {
                name: "Chicken nuggets",
                userId: "868f632e-dffc-41b0-872b-c612525e5651",
                category: "dinner"
            };

            const res = await supertest(server)
                .post("/api/recipes")
                .send(newRecipe);

            expect(res.status).toBe(401);
            expect(res.body.error).toBe("Invalid credentials, please login and try again.");
            expect(res.body.name).toBe(undefined);
        });
    });
});