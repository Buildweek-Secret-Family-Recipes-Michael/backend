import {server} from "../../server";
import {dbConfig} from "../data/dbConfig";
import supertest from "supertest";


beforeEach(async () => {
    await dbConfig.seed.run();
});

afterAll(async () => {
    await dbConfig.destroy();
});

