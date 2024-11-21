const { seed } = require("./seed");
const data = require("./dev-data");
const db = require("../db/connection");

seed(data)
	.then(() => {
		return db.end();
	})
	.catch((err) => {
		console.log(err);
	});
