const pool = require('../db');

const getAllCompanies = async (req, res, next) => {
  try {
    const query = `
      SELECT c.*, f.founders
      FROM companies c
      LEFT JOIN (
        SELECT company_id, ARRAY_AGG(full_name) AS founders
        FROM founders
        GROUP BY company_id
      ) f ON c.id = f.company_id
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const createCompany = async (req, res, next) => {
  const {
    name,
    city,
    state,
    short_description,
    long_description,
    founded_date,
  } = req.body;
  try {
    const existingCompany = await pool.query(
      'SELECT id FROM companies WHERE name = $1',
      [name]
    );
    if (existingCompany.rows.length > 0) {
      return res
        .status(400)
        .json({ message: 'Company with this name already exists' });
    }
    await pool.query(
      'INSERT INTO companies (name, city, state, short_description, long_description, founded_date) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, city, state, short_description, long_description, founded_date]
    );
    res.json({ message: 'Company created successfully' });
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM companies WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    city,
    state,
    short_description,
    long_description,
    founded_date,
  } = req.body;
  try {
    await pool.query(
      'UPDATE companies SET name = $1, city = $2, state = $3, short_description = $4, long_description = $5, founded_date = $6 WHERE id = $7',
      [name, city, state, short_description, long_description, founded_date, id]
    );
    res.json({ message: 'Company updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM companies WHERE id = $1', [id]);
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
