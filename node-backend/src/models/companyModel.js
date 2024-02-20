const pool = require('../configs/db-config');

function getAllCompanies(callback) {
  const sqlQuery = 'SELECT * FROM companies';
  pool.query(sqlQuery, callback);
}

module.exports = {
  getAllCompanies,
};
