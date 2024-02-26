const pool = require('../db');

const getAllCompanies = async (req, res, next) => {
  try {
    const query = `
      SELECT c.*, 
             COALESCE((SELECT ARRAY_AGG(full_name) 
                       FROM founders 
                       WHERE company_id = c.id), ARRAY[]::TEXT[]) AS founders
      FROM companies c
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

    // Fetch the details of the newly created company
    const newCompany = await pool.query(
      'SELECT * FROM companies WHERE name = $1',
      [name]
    );

    res.json({
      message: 'Company created successfully',
      company: newCompany.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT c.*, 
             COALESCE((SELECT ARRAY_AGG(jsonb_build_object('full_name', full_name, 'title', title)) 
                       FROM founders 
                       WHERE company_id = c.id), ARRAY[]::JSONB[]) AS founders
      FROM companies c
      WHERE c.id = $1
    `;
    const { rows } = await pool.query(query, [id]);
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
  const client = await pool.connect();

  try {
    await client.query('DELETE FROM founders WHERE company_id = $1', [id]); // Delete associated founders
    await client.query('DELETE FROM companies WHERE id = $1', [id]); // Delete the company
    await client.query('COMMIT');
    res.json({
      message: 'Company and associated founders deleted successfully',
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
