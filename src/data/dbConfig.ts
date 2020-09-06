const knex = require("knex")({client: "pg"});
const knexfile = require("../../knexfile");

export const dbConfig = knex(knexfile.development);