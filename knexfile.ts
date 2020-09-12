require("dotenv").config();//had to provide the path because my env isn't at root

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
            directory: "./src/data/migrations"
        },
        seeds: {
            directory: "./src/data/seeds",
        }
    },
    testing: {
        client: "pg",
        connection: {
            host: process.env.TESTING_DB_HOST,
            user: process.env.TESTING_DB_USER,
            password: process.env.TESTING_DB_PASSWORD,
            database: process.env.TESTING_DB_DATABASE,
            port: process.env.DB_PORT,
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./src/data/migrations"
        },
        seeds: {
            directory: "./src/data/seeds",
        }
    }
};