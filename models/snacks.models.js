const db = require("../db/connection");

exports.selectSnackById = (snack_id) => {
	const text = `SELECT * FROM snacks WHERE snack_id = $1`;
	const values = [snack_id];
	return db.query(text, values).then(({ rows }) => {
		//  if there is no snack in rows, reject with an error
		if (rows.length === 0) {
			return Promise.reject({ status: 404, msg: "Not found" });
		}
		return rows[0];
	});
};

exports.insertSnack = (newSnack) => {
	const { snack_name, snack_description, price_in_pence, category_id } =
		newSnack;
	return db
		.query(
			`INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES ($1, $2, $3, $4) RETURNING *`,
			[snack_name, snack_description, price_in_pence, category_id]
		)
		.then(({ rows }) => {
			return rows[0];
		});
};
