import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", tableBuilder => {
        // I decided to use uuids for this instead of an incremented single digit for practice and unpredictability to make my db more secure
        // I also decided to add a unique constraint in the incredibly rare chance there happens to be a collision generate
        tableBuilder.uuid("id").unique().notNullable().primary();
        tableBuilder.text("username").unique().notNullable();
        tableBuilder.text("password").notNullable();
        tableBuilder.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable("recipes", tableBuilder => {
        tableBuilder.uuid("id").unique().notNullable().primary();
        tableBuilder.text("name").notNullable();
        tableBuilder.uuid("userId").notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    });

    await knex.schema.createTable("ingredients", tableBuilder => {
        tableBuilder.uuid("id").unique().notNullable().primary();
        tableBuilder.text("amount").notNullable();
        tableBuilder.text("name").notNullable();
        //Not referencing recipe id here because it will be in the join table to allow multiple recipes access to the same ingredient
    });

    await knex.schema.createTable("instructions", tableBuilder => {
        tableBuilder.uuid("id").unique().notNullable().primary();
        tableBuilder.text("stepName").notNullable();
        tableBuilder.text("stepNum").notNullable();// todo: this will need to be unique per recipe
        tableBuilder.uuid("recipeId").notNullable().references("id").inTable("recipes").onDelete("CASCADE").onUpdate("CASCADE");
    });

    await knex.schema.createTable("users_recipes", tableBuilder => {

        tableBuilder.uuid("userId").notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
        tableBuilder.uuid("recipeId").notNullable().references("id").inTable("recipes").onDelete("CASCADE").onUpdate("CASCADE");
        tableBuilder.primary(["userId", "recipeId"]);
    });

    await knex.schema.createTable("recipes_instructions", tableBuilder => {
        tableBuilder.uuid("recipeId").notNullable().references("id").inTable("recipes").onDelete("CASCADE").onUpdate("CASCADE");
        tableBuilder.uuid("instructionId").notNullable().references("id").inTable("instructions").onDelete("CASCADE").onUpdate("CASCADE");
        tableBuilder.primary(["recipeId", "instructionId"]);
    });

    await knex.schema.createTable("recipes_ingredients", tableBuilder => {
        tableBuilder.uuid("recipeId").notNullable().references("id").inTable("recipes").onDelete("CASCADE").onUpdate("CASCADE");
        tableBuilder.uuid("ingredientId").notNullable().references("id").inTable("ingredients").onDelete("CASCADE").onUpdate("CASCADE");
        tableBuilder.primary(["recipeId", "ingredientId"]);

    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("recipes_ingredients");
    await knex.schema.dropTableIfExists("recipes_instructions");
    await knex.schema.dropTableIfExists("users_recipes");
    await knex.schema.dropTableIfExists("instructions");
    await knex.schema.dropTableIfExists("ingredients");
    await knex.schema.dropTableIfExists("recipes");
    await knex.schema.dropTableIfExists("users");
}

