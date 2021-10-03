'use strict';
const AWS = require('aws-sdk');
const { companies } = require('../constants/temp-store/store');

module.exports.list = (event, context, callback) => {
  callback(null, {
    companies
  });
};
