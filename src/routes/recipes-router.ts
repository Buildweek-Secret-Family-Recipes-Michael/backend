import express from "express";
import * as recipesModel from "../models/recipes-model";
import {validateRecipeId, validateRecipeInfo} from "../middleware/recipesMiddleware";
import {restrict, validateUserId} from "../middleware/usersMiddleware";

export const recipesRouter = express.Router();


//create
recipesRouter.post("/", validateRecipeInfo, async (req, res) => {
    try {//todo: this route needs to also post to users_recipes table
        const {name, userId, category} = req.body;
        const newRecipe = await recipesModel.createRecipe({name, userId, category});

        //todo: create instructions

        //todo: create ingredients
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

//todo: get by userid
recipesRouter.get("/:id", restrict, validateRecipeId, async (req, res) => {
    try {
        //recipe retreived by validateRecipeId middleware
        res.status(200).json(req.body.recipe);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting recipe by id"});
    }
});

recipesRouter.get("/user/:id", restrict, validateUserId, async (req, res) => {
    try {
        //this route relies on the recipe post route posting recipes to the users_recipes table
        const userId = req.body.token.userID;
        console.log(userId);
        if(userId !== req.params.id) res.status(403).json({message: "Authorization token does not match provided user id"});
        const usersRecipes = await recipesModel.findByUserId(userId);
        res.status(200).json(usersRecipes);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting recipes for given user"});
    }

});


//update


//delete