'use strict';
const db = require('../db/init');

module.exports.list = async (event, context, callback) => {
  const client = await db.init();
  if(!client && !client.query) {
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Couldn\'t connect to database, connection times out',
    }, null);
  }
  const text = 'select * from companies_info';
  console.log('list client query')
  const result = await client.query(text);
  client.end();
  return result;
};
