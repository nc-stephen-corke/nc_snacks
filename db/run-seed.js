const { seed } = require('./seed');
const data = require('./data');
const db = require('../db/connection');

seed(data)
  .then(() => {
    return db.end();
  })
  .catch((err) => {
    console.log(err);
  });
