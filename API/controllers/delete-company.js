'use strict';

const AWS = require('aws-sdk');
const { companies } = require('../constants/temp-store/store');
const { findCompany, deleteCompany } = require('../services/utils');

module.exports.delete = (event, context, callback) => {
  const companyId = event.path.id;
  let deletedCompanyIndex = null;
  let deletedCompanyID = null;
  if(!companyId) {
    console.error('Validation Failed');
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Couldn\'t delete the company. Insufficient data',
    }, null);
    return;
  }
  deletedCompanyIndex = findCompany(companies, companyId);
  if(deletedCompanyIndex >= 0) {
    deletedCompanyID = companies[deletedCompanyIndex].id;
    deleteCompany(companies, deletedCompanyIndex);
    callback(null, {
      message: 'company successfully deleted',
      status: 'Ok',
      companyId: deletedCompanyID
    });
  } else {
    callback(null, {
      statusCode: 204,
      headers: { 'Content-Type': 'application/json' },
      body: 'Couldn\'t delete the company. Company doesn\'t exist',
    });
  }
};
