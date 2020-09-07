import express from "express";
import * as recipesModel from "../models/recipes-model";
import {validateRecipeInfo} from "../middleware/recipesMiddleware";

export const recipesRouter = express.Router();


//create
recipesRouter.post("/", validateRecipeInfo, async (req, res) => {
    try {
        const {name, userId} = req.body;
        const newRecipe = await recipesModel.createRecipe({name, userId});
        res.status(201).json(newRecipe);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error creating recipe"});
    }
});


//read


//update


//delete