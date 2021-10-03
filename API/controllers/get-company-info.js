'use strict';
const AWS = require('aws-sdk');
const { companies } = require('../constants/temp-store/store');
const { findCompany } = require('../services/utils');

module.exports.getByCompanyId = (event, context, callback) => {
  const companyId = event.path.id;
  let foundCompanyIndex = null;
  if(!companyId) {
    console.error('Validation Failed');
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Couldn\'t find the company. Insufficient data',
    }, null);
    return;
  }
  foundCompanyIndex = findCompany(companies, companyId);
  if(foundCompanyIndex >= 0) {
    callback(null, companies[foundCompanyIndex]);
  } else {
    callback(null, {
      statusCode: 204,
      headers: { 'Content-Type': 'application/json' },
      body: 'Couldn\'t find the company. Company doesn\'t exist',
    });
  }
};
