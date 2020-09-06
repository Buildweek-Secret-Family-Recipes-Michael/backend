import express from "express";
import {usersRouter} from "./src/routes/users/users-router";

export const server = express();

server.use(express.json());
server.use("/api/users", usersRouter);

server.get("/", async (req, res) => {
    res.send("Welcome!");
});