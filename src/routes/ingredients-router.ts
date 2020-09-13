import express from "express";
import * as ingredientsModel from "../models/ingredients-model";
import {validateIngredientData} from "../middleware/ingredientsMiddleware";
import {validateRecipeId} from "../middleware/recipesMiddleware";

export const ingredientsRouter = express.Router();


//create
ingredientsRouter.post("/", validateRecipeId, validateIngredientData, async (req, res) => {
    try {
        const {amount, name, recipeId} = req.body;//Destructuring just to make sure nothing else gets passed to db
        const newIngredient = await ingredientsModel.createIngredient({amount, name, recipeId});
        res.status(201).json(newIngredient);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error creating new ingredient"});
    }
});

//read
ingredientsRouter.get("/:id", async (req, res) => {//todo: validate ingredient id middleware
    try {
        const ingredient = await ingredientsModel.findById(req.params.id);
        console.log(ingredient);
        res.status(200).json(ingredient);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error getting ingredient"});
    }
});


//update
//I am NOT including an update function for this endpoint because the ingredients are shared, I don't want one user changing the ingredient for others.
//A user can simply create a new ingredient


//delete
ingredientsRouter.delete("/:id", async (req, res) => {
    try {
        const deletedIngredient = await ingredientsModel.deleteIngredient(req.params.id);
        res.status(200).json({deleted: deletedIngredient});
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error deleting ingredient"});
    }
});