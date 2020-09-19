import express from "express";
import {usersRouter} from "./src/routes/users-router";
import {recipesRouter} from "./src/routes/recipes-router";
import {ingredientsRouter} from "./src/routes/ingredients-router";

import cors from "cors";

export const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);

server.get("/", async (req, res) => {
    res.send("Welcome!");
});