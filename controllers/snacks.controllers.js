const {
  fetchSnacks,
  fetchSnackBySnackId,
  addSnack,
} = require('../models/snacks.models');

const getSnacks = (request, response) => {
  fetchSnacks().then((snacks) => {
    response.status(200).send({ snacks });
  });
};
const getSnackBySnackId = (request, response) => {
  const { snack_id } = request.params;
  fetchSnackBySnackId(snack_id).then((snack) => {
    response.status(200).send({ snack: snack });
  });
};

const postSnack = (request, response) => {
  const newSnack = request.body;
  addSnack(newSnack).then(() => {
    response.status(201).send({ 'snack added': newSnack });
  });
};

module.exports = { getSnacks, getSnackBySnackId, postSnack };
