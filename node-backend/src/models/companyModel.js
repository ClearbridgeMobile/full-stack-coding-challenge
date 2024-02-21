const pool = require('../configs/db-config');

function getAllCompanies(callback) {
  const sqlQuery = 'SELECT * FROM companies';
  pool.query(sqlQuery, callback);
}

function createCompany(name, city, state, description, foundedDate, callback) {
  const sqlQuery = 'INSERT INTO companies (name, city, state, description, foundedDate) VALUES (?, ?, ?, ?, ?)';
  const values = [name, city, state, description, foundedDate];
  pool.query(sqlQuery, values, callback);
}

module.exports = {
  getAllCompanies,
  createCompany,
};
