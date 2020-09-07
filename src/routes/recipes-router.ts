import express from "express";
import * as recipesModel from "../models/recipes-model";
import {validateRecipeInfo} from "../middleware/recipesMiddleware";
import {restrict} from "../middleware/usersMiddleware";

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
recipesRouter.get("/", restrict, async (req, res) => {
    //this is a restricted route and a user will need to be signed in. Check get recipes method in recipes-model
    try {
        const recipes = await recipesModel.getRecipes();
        res.status(200).json(recipes);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting recipes"});
    }
});


//update


//delete