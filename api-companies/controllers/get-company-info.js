'use strict';
const db = require('../db/init');

module.exports.getByCompanyId = async (event, context, callback) => {
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
  /** Find company **/
  const query = {
    name: 'fetch-company',
    text: 'SELECT * FROM companies_info WHERE id = $1',
    values: [companyId],
  }
  return await client.query(query);
};
