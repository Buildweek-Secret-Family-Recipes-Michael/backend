const knex = require("knex")({client: "pg"});
const knexfile = require("../../knexfile");

module.exports = knex(knexfile.development);