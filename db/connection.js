const { Pool } = require("pg");
const pool = new Pool();

const ENV = process.env.NODE_ENV || "development";
const pathToEnvFile = `${__dirname}/../.env.${ENV}`;
// if we are in the test environment use the .env.test file to connect to the test database, otherwise use the .env.development file to connect to the dev database
require("dotenv").config({ path: pathToEnvFile });
console.log(process.env.PGDATABASE, "<--- PGDATABASE");

if (!process.env.PGDATABASE) {
	throw new Error("PGDATABASE not set!");
}

module.exports = pool;
