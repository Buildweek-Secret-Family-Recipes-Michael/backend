import * as recipesModel from "../models/recipes-model";
import jwt from "jsonwebtoken";

export async function validateRecipeInfo(req: any, res: any, next: any) {
    try {//validation for creating a new recipe
        const {name, userId} = req.body;
        if (!name || !userId) return res.status(400).json({error: "Missing name or userId"});
        next();
    } catch (e) {
        console.log(e.stack);
        next();
    }
}