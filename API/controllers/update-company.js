'use strict';
const AWS = require('aws-sdk');
const { companies } = require('../constants/temp-store/store');
const { findCompany, updateCompany } = require('../services/utils');

module.exports.update = (event, context, callback) => {
  let data;
  let updatedCompanyIndex = null;
  const companyId = event.path.id
  const timestamp = Date.now();
  if(typeof event.body === 'string') {
    data = JSON.parse(event.body);
  } else {
    data = event.body;
  }
  if (!companyId || !data.companyName || !data.companyLocationCity || !data.companyLocationState || !data.companyFoundedDate || !data.companyDescription) {
    console.error('Validation Failed');
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Couldn\'t update the company item. Insufficient data',
    }, null);
  } else {
    updatedCompanyIndex = findCompany(companies, companyId);
    if(updatedCompanyIndex >= 0) {
      const updatedCompany = {
        ...companies[updatedCompanyIndex],
        companyName: data.companyName,
        companyLocationCity: data.companyLocationCity,
        companyLocationState: data.companyLocationState,
        companyFoundedDate: data.companyFoundedDate,
        companyDescription: data.companyDescription,
        updatedAt: timestamp
      };
      updateCompany(companies, updatedCompanyIndex, updatedCompany);
      callback(null, {
        message: 'company successfully updated',
        status: 'Ok',
        company: updatedCompany
      });
    } else {
      callback(null, {
        statusCode: 204,
        headers: { 'Content-Type': 'application/json' },
        body: 'Couldn\'t update the company. Company doesn\'t exist',
      });
    }
  }
};
