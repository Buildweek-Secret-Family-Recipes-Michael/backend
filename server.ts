import express from "express";
import {usersRouter} from "./src/routes/users-router";
import {recipesRouter} from "./src/routes/recipes-router";

export const server = express();

server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/recipes", recipesRouter);

server.get("/", async (req, res) => {
    res.send("Welcome!");
});