import express from "express";
import {server} from "../server";

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});