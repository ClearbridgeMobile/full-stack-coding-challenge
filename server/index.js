const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
}

// Companies Index
app.get('/companies', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, city, state, short_description FROM companies'
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Companies Create
app.post('/companies', async (req, res, next) => {
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
});

// Company Details
app.get('/companies/:id', async (req, res, next) => {
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
});

// Update Company
app.put('/companies/:id', async (req, res, next) => {
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
});

// Delete Company
app.delete('/companies/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM companies WHERE id = $1', [id]);
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Founders
// Add Founder to Company
app.post('/companies/:id/founders', async (req, res, next) => {
  const { id } = req.params;
  const { full_name, title } = req.body;
  try {
    const existingFounder = await pool.query(
      'SELECT company_id FROM founders WHERE full_name = $1 AND title = $2',
      [full_name, title]
    );
    if (
      existingFounder.rows.length > 0 &&
      existingFounder.rows[0].company_id !== parseInt(id)
    ) {
      return res.status(400).json({
        message: 'Founder is already associated with another company',
      });
    }

    const founderInSameCompany = await pool.query(
      'SELECT id FROM founders WHERE full_name = $1 AND title = $2 AND company_id = $3',
      [full_name, title, id]
    );
    if (founderInSameCompany.rows.length > 0) {
      return res
        .status(400)
        .json({ message: 'Founder is already associated with this company' });
    }

    await pool.query(
      'INSERT INTO founders (full_name, title, company_id) VALUES ($1, $2, $3)',
      [full_name, title, id]
    );
    res.json({ message: 'Founder added successfully' });
  } catch (error) {
    next(error);
  }
});

// List Founders of a Company
app.get('/companies/:id/founders', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM founders WHERE company_id = $1',
      [id]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
