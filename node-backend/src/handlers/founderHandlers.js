const founderModel = require('../models/founderModel');
const { handleInternalServerError } = require('../utils/utils');

function getAllFoundersByCompanyId(req, res) {
  const companyId = req.params.id;
  founderModel.getAllFoundersByCompanyId(companyId, (error, results) => {
    if (error) {
      return handleInternalServerError(error, res);
    }

    res.json(results);
  });
}

function addFounderToCompany(req, res) {
  const companyId = req.params.id;
  const { founderName, title } = req.body;

  founderModel.addFounderToCompany(companyId, founderName, title, (error, results) => {
    if (error) {
      if (error.duplicateFounder) {
        return res.status(400).json({ error: 'Founder with the same name already exists for another company' });
      } else {
        return handleInternalServerError(error, res);
      }
    }

    res.json({ founderId: results.insertId });
  });
}

module.exports = {
  getAllFoundersByCompanyId,
  addFounderToCompany
};