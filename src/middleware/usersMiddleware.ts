import * as usersModel from "../models/users/users-model";
import bcrypt from "bcryptjs";

export async function validateUserInfo(req: any, res: any, next: any) {
    try {
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).json({error: "Missing username or password"});
        const user = await usersModel.findBy({username}).first();
        if (user) return res.status(409).json({message: "Username is already taken"});
        req.body.user = user;
        next();
    } catch (e) {
        console.log(e.stack);
        next();
    }
}

export async function validateUserUpdate(req: any, res: any, next: any) {
    try {
        // check that username, password are provided
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).json({error: "Missing username or password"});

        // check that id record exists
        const matcher = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;// this matcher checks if the provided id is a valid uuid or not
        if (!req.params.id.match(matcher)) return res.status(400).json({error: "Provided ID is not a valid uuid"});
        const userExists = await usersModel.findById(req.params.id).first();// getting by id and not username because a new username would not be in the db
        if (!userExists) return res.status(400).json({error: "Invalid user id provided"});
        req.body.id = userExists.id;// creating this just in the very off chance the req.params.id somehow gets out of sync, don't want to overwrite it

        /* this code is needed to make sure a user can't steal another users username. If we let let a user set a new username without checking it,
        that user could enter another users username and we'd have a problem
        get user from db based on id, if req.body.username===user.username continue
        else if req.body.user!==user.username => userExists = db.findBy(username) if !userExists continue, else "username already exists"*/
        if (req.body.username === userExists.username) {
            return next();
        } else if (req.body.username !== userExists.username){
            const usernameExists = await usersModel.findBy({username}).first();
            if(usernameExists) return res.status(400).json({error: "Username already taken"});
        }
        next();
    } catch (e) {
        console.log(e.stack);
        next();
    }
}