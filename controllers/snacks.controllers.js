const { selectSnackById } = require('../models/snacks.models');

exports.getApi = (req, res) => {
  res.status(200).send({ msg: 'all okay!' });
};

exports.getSnackById = (req, res) => {
  const { id } = req.params;

  selectSnackById(id).then((snack) => {
    res.status(200).send({ snack });
  });
};
