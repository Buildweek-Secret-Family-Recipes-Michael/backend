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
            const matcher = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;//to test the id provided is a valid uuid
            const newUser = {
                username: "eeveeTesting",
                password: "newPassword"
            };
            const res = await supertest(server)
                .post("/api/users/register")
                .set("content-type", "application/json")
                .send(JSON.stringify(newUser));

            expect(res.status).toBe(201);
            expect(res.body.username).toBe(newUser.username);
            expect(res.body.id).toMatch(matcher);
        });
    });

    describe("When missing username and password", () => {
        it("Sends missing username to server and receives error message and 400", async () => {
            const newUser = {password: "missingUsername"};
            const res = await supertest(server)
                .post("/api/users/register")
                .set("content-type", "application/json")
                .send(JSON.stringify(newUser));

            expect(res.status).toBe(400);
            expect(res.body.username).toBe(undefined);
            expect(res.body.error).toBe("Missing username or password");
        });
    });

    describe("When username already exists", () => {
        it("Sends a username that already exists and receives error message and 409", async () => {
            const newUser = {username: "pokemon0", password: "usernameTaken"};
            const res = await supertest(server)
                .post("/api/users/register")
                .set("content-type", "application/json")
                .send(JSON.stringify(newUser));

            expect(res.status).toBe(409);
            expect(res.body.username).toBe(undefined);
            expect(res.body.error).toBe("Username is already taken");
        });
    });
});