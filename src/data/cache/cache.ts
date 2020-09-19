import util from "util";
import redis from "redis";

const port = process.env.REDIS_PORT;
const host = process.env.REDIS_URL;
const password = process.env.REDIS_PASSWORD;

if (!port || !host || !password) throw new Error("Invalid redis configuration, possible envs missing");

export const redisClient = redis.createClient({
    port: parseInt(port, 10),
    host: host,
    password: password
});

//@ts-ignore
redisClient.get = util.promisify(redisClient.get);
console.log("Creating redis client");