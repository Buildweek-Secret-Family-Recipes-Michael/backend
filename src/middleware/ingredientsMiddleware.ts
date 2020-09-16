import * as ingredientsModel from "../models/ingredients-model";
import {Request, Response, NextFunction} from "express";


export function validateIngredientData(req: Request, res: Response, next: NextFunction) {
    try {
        const {amount, name, recipeId} = req.body;
        if (!amount || !name || !recipeId) return res.status(400).json({error: "Ingredient data missing. Please make sure amount, name and recipeId are included"});
        next();
    } catch (e) {
        console.log(e.stack);
        next();
    }
    /*
    export interface IIngredient {
    amount: string;
    name: string;
    recipeId: string;
    id?: string;
}
     */

}