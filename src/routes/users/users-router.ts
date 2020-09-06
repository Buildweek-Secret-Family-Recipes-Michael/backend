import * as usersModel from "../../models/users/users-model";
import express from "express";
import bcrypt from "bcryptjs";

export const usersRouter = express.Router();

// create
usersRouter.post("/register", async (req, res) => {
    try {
        const {username, password}: usersModel.IUser = req.body;
        const user = await usersModel.findBy({username}).first();

        if (user) return res.status(409).json({message: "Username is already taken"});

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


// delete