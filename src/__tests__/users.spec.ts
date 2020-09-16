import {server} from "../../server";
import * as usersModel from "../models/users-model";
import {dbConfig} from "../data/dbConfig";
import supertest from "supertest";


// * clears db and reseeds it to initial data before each individual test
beforeEach(async () => {
    await dbConfig.migrate.latest();
    return await dbConfig.seed.run();
});
// * closes any database connections after the tests in case it stays open
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

describe("Updates a user", () => {
    describe("When information provided is valid", () => {
        it("Sends valid user update information", async () => {
            const newUserInfo = {username: "newPokemon0", password: "newPokemon0Password"};
            const res = await supertest(server)
                .put("/api/users/user/868f632e-dffc-41b0-872b-c612525e5651")
                .set("content-type", "application/json")
                .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI4NjhmNjMyZS1kZmZjLTQxYjAtODcyYi1jNjEyNTI1ZTU2NTEifQ.8WXM3KzmRoQkvweigGeYDpCVXEnPukrX7y0Mz5TsORc")
                .send(JSON.stringify(newUserInfo));

            expect(res.status).toBe(200);
            expect(res.body.username).toBe(newUserInfo.username);
        });
    });
    describe("When invalid user information is provided", () => {
        //If these tests stop passing it is because the jwt expired. Create one that does not expire!
        it("Provides a username that already exists", async () => {
            const newUserInfo = ({username: "pokemon2", password: "newPass2"});
            const res = await supertest(server)
                .put("/api/users/user/868f632e-dffc-41b0-872b-c612525e5651")
                .set("content-type", "application/json")
                .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI4NjhmNjMyZS1kZmZjLTQxYjAtODcyYi1jNjEyNTI1ZTU2NTEifQ.8WXM3KzmRoQkvweigGeYDpCVXEnPukrX7y0Mz5TsORc")
                .send(JSON.stringify(newUserInfo));

            expect(res.status).toBe(400);
            expect(res.body.username).toBe(undefined);
            expect(res.body.error).toBe("Username already taken");
        });
        it("Provides an invalid jwt", async () => {
            const newUserInfo = ({username: "Shawn Spencer", password: "Bruton Gaster"});
            const res = await supertest(server)
                .put("/api/users/user/868f632e-dffc-41b0-872b-c612525e5651")
                .set("content-type", "application/json")
                .set("authorization", "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI4NjhmNjMyZS1kZmZjLTQxYjAtODcyYi1jNjEyNTI1ZTU2NTEifQ.8WXM3KzmRoQkvweigGeYDpCVXEnPukrX7y0Mz5TsORc")
                .send(JSON.stringify(newUserInfo));

            expect(res.status).toBe(401);
            expect(res.body.username).toBe(undefined);
            expect(res.body.error).toBe("Invalid credentials");
        });
        it("Provides a user with no username", async () => {
            const newUserInfo = ({password: "Bruton Gaster"});
            const res = await supertest(server)
                .put("/api/users/user/868f632e-dffc-41b0-872b-c612525e5651")
                .set("content-type", "application/json")
                .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI4NjhmNjMyZS1kZmZjLTQxYjAtODcyYi1jNjEyNTI1ZTU2NTEifQ.8WXM3KzmRoQkvweigGeYDpCVXEnPukrX7y0Mz5TsORc")
                .send(JSON.stringify(newUserInfo));

            expect(res.status).toBe(400);
            expect(res.body.username).toBe(undefined);
            expect(res.body.error).toBe("Missing username or password");
        });
        it("Provides an id that is not a valid uuid", async () => {
            const newUserInfo = ({username: "Henry spencer", password: "Bruton Gaster"});
            const res = await supertest(server)
                .put("/api/users/user/8")
                .set("content-type", "application/json")
                .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI4NjhmNjMyZS1kZmZjLTQxYjAtODcyYi1jNjEyNTI1ZTU2NTEifQ.8WXM3KzmRoQkvweigGeYDpCVXEnPukrX7y0Mz5TsORc")
                .send(JSON.stringify(newUserInfo));

            expect(res.status).toBe(400);
            expect(res.body.username).toBe(undefined);
            expect(res.body.error).toBe("Provided ID is not a valid uuid");
        });
    });
});