import express from "express";
import {usersRouter} from "./src/routes/users-router";
import {recipesRouter} from "./src/routes/recipes-router";
import {ingredientsRouter} from "./src/routes/ingredients-router";
import responseTime from "response-time";

import cors from "cors";

export const server = express();

server.use(cors());
server.use(express.json());
server.use(responseTime());

server.use("/api/users", usersRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);

server.get("/", async (req, res) => {
    res.send("Welcome!");
});