const pool = require('../configs/db-config');

function getAllFoundersByCompanyId(companyId, callback) {
  const sqlQuery = `
    SELECT founderId, companyId, founderName,
    GROUP_CONCAT(DISTINCT title ORDER BY title SEPARATOR " & ") AS titles
    FROM founders WHERE companyId = ? GROUP BY founderName
  `;
  pool.query(sqlQuery, [companyId], callback);
}

function addFounderToCompany(companyId, founderName, title, callback) {
  const checkFounderQuery = 'SELECT COUNT(*) AS count FROM founders WHERE founderName = ? AND companyId <> ?';

  pool.query(checkFounderQuery, [founderName, companyId], (checkError, checkResults) => {
    if (checkError) {
      return callback(checkError, null);
    }

    if (checkResults[0].count > 0) {
      return callback({ duplicateFounder: true }, null);
    }

    const addFounderQuery = 'INSERT INTO founders (companyId, founderName, title) VALUES (?, ?, ?)';
    const values = [companyId, founderName, title];

    pool.query(addFounderQuery, values, callback);
  });
}

module.exports = {
  getAllFoundersByCompanyId,
  addFounderToCompany,
};

