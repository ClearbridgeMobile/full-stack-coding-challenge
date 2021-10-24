'use strict';
const db = require('../db/init');

module.exports.delete = async (event, context, callback) => {
  const client = await db.init();

  if(!client && !client.query) {
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Something went wrong',
    }, null);
  }

  const companyId = event.path.id;
  if(!companyId) {
    console.error('Validation Failed');
    callback({
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: 'Please specify all parameters of request',
    }, null);
    return;
  }
  /** Delete company **/
  const text = 'delete from companies_info where id = $1 RETURNING *';
  return await client.query(text, [companyId]);
};
