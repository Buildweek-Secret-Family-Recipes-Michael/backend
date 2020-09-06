require("dotenv").config();

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            ssl: {
                sslmode: "require",
                rejectUnauthorized: false,
            }
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./data/migrations"
        },
        seeds: {
            directory: "./data/seeds",
        },
        pool: {
            afterCreate: (conn: any, done: any) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            },
        },
    }
};