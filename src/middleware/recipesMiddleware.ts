import * as recipesModel from "../models/recipes-model";

declare global {
    namespace Express {
        interface Request {
            user: { username: string, password: string };
            recipe: {name: string, userId: string};
        }
    }
}

export async function validateRecipeInfo(req: any, res: any, next: any) {
    try {
        const {name, category, source} = req.body;
        const userId = req.token.userId;
        if (!name || !userId || !category || !source) return res.status(400).json({error: "Missing recipe info, ensure required information is provided"});
        next();
    } catch (e) {
        console.log(e.stack);
        next();
    }
}

export async function validateRecipeId(req: any, res: any, next: any) {
    try {
        // this matcher checks if the provided id is a valid uuid or not
        const recipeId = req.params.id || req.body.recipeId;
        const matcher = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!recipeId.match(matcher)) return res.status(400).json({error: "Id provided is not a valid uuid"});
        const recipe = await recipesModel.findById(recipeId);
        if (!recipe) return res.status(400).json({error: "Id provided does not match any recipe"});
        req.recipe = recipe;
        next();
    } catch (e) {
        console.log(e.stack);
        next();
    }
}