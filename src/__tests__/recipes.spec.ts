import {server} from "../../server";
import {dbConfig} from "../data/dbConfig";
import supertest from "supertest";
import * as recipesModel from "../models/recipes-model";
import {IRecipe} from "../models/recipes-model";


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
    describe("when recipe contains valid name, userId, and category provided", () => {
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
                .set("content-type", "application/json")
                .send(newRecipe);

            expect(res.status).toBe(201);
            expect(res.body.name).toBe(newRecipe.name);
            expect(res.body.userId).toBe(newRecipe.userId);
            expect(res.body.category).toBe(newRecipe.category);
            expect(res.body.ingredients).toContainEqual(newRecipe.ingredients![0]);//asserting it will exist because it always will in this test
            expect(res.body.instructions).toContainEqual(newRecipe.instructions![0]);
        });
    });
});