const express = require('express');
const { getApi, getSnackById } = require('./controllers/snacks.controllers');

const app = express();

app.get('/api', getApi);

app.get('/api/snacks/:id', getSnackById);

module.exports = app;
