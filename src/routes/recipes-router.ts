import express from "express";
import * as recipesModel from "../models/recipes-model";
import {validateRecipeId, validateRecipeInfo} from "../middleware/recipesMiddleware";
import {restrict} from "../middleware/usersMiddleware";
import {IRecipe} from "../models/recipes-model";
import {clearHash} from "../data/cache/cache";

export const recipesRouter = express.Router();


//create
recipesRouter.post("/", restrict, validateRecipeInfo, async (req, res) => {
    try {
        const {name, category, source, ingredients, instructions} = req.body;
        const userId = req.token.userId;
        const newRecipe = await recipesModel.createRecipe({name, userId, category, source, ingredients, instructions});

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

recipesRouter.get("/:id", restrict, validateRecipeId, async (req, res) => {
    try {
        //recipe retrieved by validateRecipeId middleware
        res.status(200).json(req.recipe);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting recipe by id"});
    }
});

recipesRouter.get("/?s=:filter", restrict, async (req, res) => {
    try {

    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error finding recipes"});
    }
});


//update
recipesRouter.put("/:id", restrict, validateRecipeId, validateRecipeInfo, async (req, res) => {
    try {
        const {name, category, source, instructions, ingredients} = req.body;
        const userId = req.token.userId;
        /*
        update in recipes table: name, category
        update in recipes_ingredients: recipeId and ingredientId note: Might need to delete existing records and readd all to make sure no duplicates
        update in recipes_instructions: same as above but for ins
         */
        const updatedRecipe = await recipesModel.updateRecipe({name, category, source, userId, instructions, ingredients, id:req.params.id});

        res.status(200).json(updatedRecipe);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error updating recipe"});
    }
});


//delete

recipesRouter.delete("/:id", restrict, validateRecipeId, async (req, res) => {
    try {
        const deletedRecipe = await recipesModel.deleteRecipe(req.params.id);
        await clearHash(req.token.userId);//clear the redis cache so we aren't sending stale data
        console.log(req.token.userId);
        res.status(200).json(deletedRecipe);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error deleting recipe"});
    }
});