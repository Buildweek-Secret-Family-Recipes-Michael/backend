import express from "express";
import * as recipesModel from "../models/recipes-model";
import {validateRecipeId, validateRecipeInfo} from "../middleware/recipesMiddleware";
import {restrict, validateUserId} from "../middleware/usersMiddleware";

export const recipesRouter = express.Router();


//create
recipesRouter.post("/", restrict, validateRecipeInfo, async (req, res) => {
    try {
        const {name, category, ingredients, instructions} = req.body;
        const userId = req.token.userId;
        const newRecipe = await recipesModel.createRecipe({name, userId, category, ingredients, instructions});

        res.status(201).json(newRecipe);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error creating recipe"});
    }
});


//read
recipesRouter.get("/", restrict, async (req, res) => {
    //this is a restricted route and a user will need to be signed in. Check get recipes method in recipes-model
    //this endpoint gets all the recipes for a given user, that userId is taken from the passed in jwt
    try {
        const recipes = await recipesModel.getUserRecipes(req.token.userId);
        res.status(200).json({recipes});
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting recipes"});
    }
});

//todo: get by userid
recipesRouter.get("/:id", restrict, validateRecipeId, async (req, res) => {
    try {
        //recipe retrieved by validateRecipeId middleware
        res.status(200).json(req.recipe);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting recipe by id"});
    }
});


//update


//delete