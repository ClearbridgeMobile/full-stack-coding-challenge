'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const { companies } = require('../constants/temp-store/store');
const table = require('../services/init');

module.exports.create = (event, context, callback) => {
  let data;
  const timestamp = Date.now();

  if(typeof event.body === 'string') {
    data = JSON.parse(event.body);
  } else {
    data = event.body;
  }

  if (!data || !data.companyName || !data.companyLocationCity || !data.companyLocationState || !data.companyFoundedDate || !data.companyDescription) {
    console.error('Validation Failed');
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Couldn\'t create the company item. Insufficient data',
    }, null);
    return;
  }
  const company = {
      id: uuid.v1(),
      companyName: data.companyName,
      companyLocationCity: data.companyLocationCity,
      companyLocationState: data.companyLocationState,
      companyFoundedDate: data.companyFoundedDate,
      companyDescription: data.companyDescription,
      createdAt: timestamp,
      updatedAt: timestamp
  };
  /** Save company **/
  if(typeof companies === 'object') {
    companies.push(company);
  }

  try {
      table.init();
  } catch (e) {
      console.error(e)
  }

  callback(null, {
    message: 'created company',
    status: 'Ok',
    company: company
  });
};
