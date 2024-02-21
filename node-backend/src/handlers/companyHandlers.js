const companyModel = require('../models/companyModel');
const { handleInternalServerError, validateRequiredFields } = require('../utils/utils');

function getAllCompanies(req, res) {
  companyModel.getAllCompanies((error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    res.json(results);
  });
}

function createCompany(req, res) {
  const { name, city, state, description, foundedDate } = req.body;
  const requiredFields = [name, city, state, description];

  if (!validateRequiredFields(requiredFields, res)) {
    return;
  }

  companyModel.createCompany(name, city, state, description, foundedDate, (error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    res.json({ companyId: results.insertId });
  });
}

module.exports = {
  getAllCompanies,
  createCompany
};
