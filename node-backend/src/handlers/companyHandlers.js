const companyModel = require('../models/companyModel');
const { handleInternalServerError, buildSetClauses, validateRequiredFields } = require('../utils/utils');

function getAllCompanies(req, res) {
  companyModel.getAllCompanies((error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    res.json(results);
  });
}

function getCompanyById(req, res) {
  const companyId = req.params.id;
  companyModel.getCompanyById(companyId, (error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(results[0]);
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

function updateCompany(req, res) {
  const { name, city, state, description, foundedDate } = req.body;
  const companyId = req.params.id;

  const setClauses = buildSetClauses({ name, city, state, description, foundedDate });
  const values = setClauses ? [...setClauses.values, companyId] : [companyId];

  companyModel.updateCompany(setClauses, values, (error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    res.json({ affectedRows: results.affectedRows });
  });
}

function deleteCompany(req, res) {
  const companyId = req.params.id;

  companyModel.deleteCompany(companyId, (error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(204).send();
  });
}

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
