import * as usersModel from "../models/users-model";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {restrict, validateUserInfo, validateUserUpdate} from "../middleware/usersMiddleware";

export const usersRouter = express.Router();

// create
usersRouter.post("/register", validateUserInfo, async (req, res) => {
    try {
        const {username, password} = req.body;

        const newUser = await usersModel.createUser({
            username,
            password: await bcrypt.hash(password, 13)
        });
        res.status(201).json(newUser);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error registering new user"});
    }
});

usersRouter.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await usersModel.findBy({username}).first();

        if (!user) return res.status(401).json({error: "Username or password invalid"});

        // hash the password and check that it matches what was found in db
        const passValid = await bcrypt.compare(password, user.password);
        if (!passValid) return res.status(401).json({error: "Username or password invalid"});// using the same message as above as a way to not give attackers a clue if they have a valid username or password

        // generate a new jwt
        const token = jwt.sign({
            userID: user.id
            // @ts-ignore
        }, process.env.JWT_SECRET);// todo: type string | undefined unassignable...

        res.cookie("SFRToken", token);
        res.status(200).json({token, userId: user.id});
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error logging in"});
    }
});


// read
usersRouter.get("/", restrict, async (req, res) => {
    try {
        res.json(await usersModel.getUsers());
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting users"});
    }
});


// update
usersRouter.put("/user/:id", restrict, validateUserUpdate, async (req, res) => {
    try {
        const {username, password} = req.body;
        const newUserData = {
            username,
            password: await bcrypt.hash(password, 13),
            id: req.body.id
        };
        const newUser = await usersModel.updateUser(newUserData);
        res.status(201).json(newUser);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error updating user"});
    }
});


// delete