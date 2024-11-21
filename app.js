const express = require("express");
const {
	getApi,
	getSnackById,
	postSnack,
} = require("./controllers/snacks.controllers");
const {
	postgresErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} = require("./errors");

const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/snacks/:snack_id", getSnackById);

app.post("/api/snacks", postSnack);

app.all("*", (req, res) => {
	// custom 404 route handler
	res.status(404).send({ msg: "Not found" });
});

app.use(postgresErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
