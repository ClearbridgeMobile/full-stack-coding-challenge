'use strict';
const db = require('../db/init');

module.exports.list = async (event, context, callback) => {
  const client = await db.init();

  if(!client && !client.query) {
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Something went wrong',
    }, null);
  }
  const text = 'select * from companies_info';
  return await client.query(text);
};
