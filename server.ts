import express from "express";
import {usersRouter} from "./src/routes/users-router";
import {recipesRouter} from "./src/routes/recipes-router";
import {ingredientsRouter} from "./src/routes/ingredients-router";

export const server = express();

server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsRouter);

server.get("/", async (req, res) => {
    res.send("Welcome!");
});