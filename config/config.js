require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "production": {
    "username": process.env.DB_PROD_USERNAME,
    "password": process.env.DB_PROD_PASS,
    "database": process.env.DB_PROD_DATABASE,
    "host": process.env.DB_PROD_HOST,
    "dialect": "postgres",
    // "dialectOptions": {
    //   // "ssl": true,
    //   // ssl: { rejectUnauthorized: false }
    // },
    "operatorsAliases": 0
  },
  "saltRounds": 10
}