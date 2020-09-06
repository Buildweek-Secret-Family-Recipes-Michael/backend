import * as usersModel from "../../models/users/users-model";
import express from "express";
import bcrypt from "bcryptjs";
import {validateUserInfo, validateUserUpdate} from "../../middleware/usersMiddleware";

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


// read


// update
usersRouter.put("/user/:id", validateUserUpdate, async (req, res) => {
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