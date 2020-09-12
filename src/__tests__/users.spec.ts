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


describe("Creates a new user", () => {
    describe("When valid new user info is provided", () => {
        it("Receives the created user info from the server", async () => {
            const newUser = {
                username: "eevee",
                password: "newPassword"
            };
            const res = await supertest(server)
                .post("/api/users/register")
                .set("content-type", "application/json")
                .send(JSON.stringify(newUser));

            expect(res.status).toBe(201);
            expect(res.body.username).toBe(newUser.username);
        });
    });
});