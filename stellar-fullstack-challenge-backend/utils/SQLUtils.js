const GetAll = (db) => `SELECT * FROM ${db}`;

const GetCompanyById = (id) => `SELECT *
FROM Companies
WHERE companyId = '${id}';`;

const PostCompany = (companyName, foundedDate, city, state, description) =>
  `INSERT INTO Companies (companyName, foundedDate, city, state, description) 
  VALUES ('${companyName}',
         '${foundedDate}', 
         '${city}', 
         '${state}', 
         '${description}' )`;

const PutCompany = (
  companyName,
  foundedDate,
  city,
  state,
  description,
  companyId
) =>
  `UPDATE Companies SET 
     companyName = '${companyName}',
     foundedDate = '${foundedDate}',
     city = '${city}',
     state = '${state}',
     description = '${description}'
 WHERE companyId = '${companyId}';`;

const DeleteQuery = (id,db) => `DELETE FROM ${db}  WHERE companyId = '${id}'`;

const FoundersByCompanyId = (companyId) => `SELECT *
FROM Founders
WHERE companyId = '${companyId}';`;

const PostFounder = (
  companyId,
  firstName,
  lastName,
  title
) => `INSERT INTO Founders (companyId, firstName, lastName, title)
VALUES (
    '${companyId}',
    '${firstName}',
    '${lastName}',
    '${title}' 
)`;

const FindFounder = (firstName, lastName) =>
  `SELECT COUNT(*) AS count FROM Founders WHERE firstName = '${firstName}' AND lastName = '${lastName}'`;

const SQLUtils = {
  GetAll,
  PostCompany,
  PutCompany,
  DeleteQuery,
  PostFounder,
  FindFounder,
  FoundersByCompanyId,
  GetCompanyById,
};
module.exports = SQLUtils;
