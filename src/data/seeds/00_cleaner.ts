// @ts-ignore todo: no types are available for knex-cleaner, so I can only ts-ignore
import cleaner from "knex-cleaner";
import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    return cleaner.clean(knex, {
        ignoreTables: ["knex_migrations", "knex_migrations_lock"], // don't empty migration tables
    });
}