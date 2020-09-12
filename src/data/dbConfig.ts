const knex = require("knex");
const knexfile = require("../../knexfile");

const dbEnv = process.env.DB_ENV || "development";

export const dbConfig = knex(knexfile[dbEnv]);