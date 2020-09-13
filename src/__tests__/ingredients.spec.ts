import {server} from "../../server";
import {dbConfig} from "../data/dbConfig";
import supertest from "supertest";
import * as ingredientsModel from "../models/ingredients-model";


beforeEach(async () => {
    await dbConfig.seed.run();
});

afterAll(async () => {
    await dbConfig.destroy();
});

describe("Creates an ingredient", () => {
    describe("When valid ingredient info is provided", () => {
        it("creates the ingredient and receives it back from the server with a 200", async () => {
            const newIngredient = {
                amount: "1 cup",
                name: "sugar",
                recipeId: "2ded4075-ded3-4938-9dae-f81f29c79ec8"
            };
            console.log("Past new ing");
            const res = await supertest(server)
                .post("/api/ingredients")
                .set("content-type", "application/json")
                .send(JSON.stringify(newIngredient));

            expect(res.status).toBe(201);
        });
    });
});

describe("Deletes an ingredient", () => {
    describe("When a valid id is provided", () => {
        it("deletes the ingredient from the db receiving the deleted ingredient", async () => {
            const idToBeDeleted = "11e5ac5b-5fe1-4bba-8f0f-eebac0ac430a";
            const ingredientToBeDeleted = await ingredientsModel.findById(idToBeDeleted);
            const res = await supertest(server).del(`/api/ingredients/${idToBeDeleted}`);

            expect(res.status).toBe(200);
            expect(res.body.deleted.name).toBe(ingredientToBeDeleted.name);
        });
    });
});