const knex = require("knex");
const knexfile = require("../../knexfile");

export const dbConfig = knex(knexfile.development);