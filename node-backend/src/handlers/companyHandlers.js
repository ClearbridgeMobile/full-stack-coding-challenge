const companyModel = require('../models/companyModel');
const { handleInternalServerError } = require('../utils/utils');

function getAllCompanies(req, res) {
  companyModel.getAllCompanies((error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    res.json(results);
  });
}

module.exports = {
  getAllCompanies,
};
