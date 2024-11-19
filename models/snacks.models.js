const db = require('../db/connection');

function selectSnacks() {
  return db.query('SELECT * FROM snacks;').then(({ rows }) => {
    return rows;
  });
}

exports.selectSnackById = (snack_id) => {
  const text = `SELECT * FROM snacks WHERE snack_id = $1`;
  const values = [snack_id];
  return db.query(text, values).then(({ rows }) => {
    return rows[0];
  });
};
