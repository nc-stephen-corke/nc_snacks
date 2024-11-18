const db = require('./connection.js');
const format = require('pg-format');
const { createRef, formatSnacksData } = require('../utils/seed-formatting.js');

exports.seed = ({ categoriesData, snacksData, vendingMachineData }) => {
  return db
    .query('DROP TABLE IF EXISTS snacks;')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS categories');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS vending_machines');
    })
    .then(() => {
      return db.query(`CREATE TABLE vending_machines (
            vending_machine_id SERIAL PRIMARY KEY,
            location VARCHAR,
            rating INT)`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories(
            category_id SERIAL PRIMARY KEY,
            category_name VARCHAR(40) NOT NULL)`);
    })
    .then(() => {
      return db.query(`CREATE TABLE snacks(
            snack_id SERIAL PRIMARY KEY,
            snack_name VARCHAR(40) NOT NULL,
            snack_description VARCHAR(100),
            price_in_pence INT,
            category_id INT REFERENCES categories(category_id))`);
    })
    .then(() => {
      const formattedCategories = categoriesData.map((category) => {
        return [category.category_name];
      });
      const insertCategoriesQueryString = format(
        `
            INSERT INTO categories (category_name) VALUES %L RETURNING *;`,
        formattedCategories
      );

      return db.query(insertCategoriesQueryString);
    })
    .then(({ rows }) => {
      const refObj = createRef(rows);

      const formattedSnacks = formatSnacksData(snacksData, refObj);

      const queryStr = format(
        `INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES %L`,
        formattedSnacks
      );

      return db.query(queryStr);
    })
    .then(() => {
      const formattedVMs = vendingMachineData.map(({ location, rating }) => {
        return [location, rating];
      });
      const queryStr = format(
        `INSERT INTO vending_machines (location, rating) VALUES %L`,
        formattedVMs
      );
      return db.query(queryStr);
    })
    .then(() => {
      return db.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
