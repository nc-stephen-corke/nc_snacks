const { selectSnackById, insertSnack } = require("../models/snacks.models");

exports.getApi = (req, res) => {
	res.status(200).send({ msg: "all okay!" });
};

exports.getSnackById = (req, res, next) => {
	const { snack_id } = req.params;

	selectSnackById(snack_id)
		.then((snack) => {
			res.status(200).send({ snack });
		})
		.catch(next);
};

exports.postSnack = (req, res, next) => {
	const newSnack = req.body;
	insertSnack(newSnack)
		.then((insertedSnack) => {
			res.status(201).send({ snack: insertedSnack });
		})
		.catch(next);
};
