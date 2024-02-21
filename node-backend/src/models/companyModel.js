const pool = require('../configs/db-config');

function getAllCompanies(callback) {
  const sqlQuery = 'SELECT * FROM companies';
  pool.query(sqlQuery, callback);
}

function getCompanyById(companyId, callback) {
  const sqlQuery = 'SELECT * FROM companies WHERE companyId = ?';
  pool.query(sqlQuery, [companyId], callback);
}

function createCompany(name, city, state, description, foundedDate, callback) {
  const sqlQuery = 'INSERT INTO companies (name, city, state, description, foundedDate) VALUES (?, ?, ?, ?, ?)';
  const values = [name, city, state, description, foundedDate];
  pool.query(sqlQuery, values, callback);
}

function updateCompany(setClauses, values, callback) {
  const sqlQuery = `UPDATE companies SET ${setClauses.query} WHERE companyId = ?`;
  pool.query(sqlQuery, values, callback);
}

function deleteCompany(companyId, callback) {
  const deleteFoundersQuery = 'DELETE FROM founders WHERE companyId = ?';
  const deleteCompanyQuery = 'DELETE FROM companies WHERE companyId = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err, null);
    }

    connection.beginTransaction((beginTransactionErr) => {
      if (beginTransactionErr) {
        connection.release();
        return callback(beginTransactionErr, null);
      }

      connection.query(deleteFoundersQuery, [companyId], (deleteFoundersErr, deleteFoundersResults) => {
        if (deleteFoundersErr) {
          connection.rollback(() => {
            connection.release();
            return callback(deleteFoundersErr, null);
          });
        }

        connection.query(deleteCompanyQuery, [companyId], (deleteCompanyErr, deleteCompanyResults) => {
          if (deleteCompanyErr) {
            connection.rollback(() => {
              connection.release();
              return callback(deleteCompanyErr, null);
            });
          }

          connection.commit((commitErr) => {
            if (commitErr) {
              connection.rollback(() => {
                connection.release();
                return callback(commitErr, null);
              });
            }

            connection.release();
            callback(null, deleteCompanyResults);
          });
        });
      });
    });
  });
}

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
