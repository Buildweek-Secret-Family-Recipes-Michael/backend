import express from "express";

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());

server.get("/", async (req, res) => {
    res.send("Welcome!");
});

server.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});