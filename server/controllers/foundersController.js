const pool = require('../db');

const addFounder = async (req, res, next) => {
  const { full_name, title, id } = req.body;
  try {
    console.log('Company ID:', id); // Check if company ID is correctly extracted

    // Check if founder is already associated with another company
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

    // Check if founder is already associated with the same company
    const founderInSameCompany = await pool.query(
      'SELECT id FROM founders WHERE full_name = $1 AND title = $2 AND company_id = $3',
      [full_name, title, id]
    );
    if (founderInSameCompany.rows.length > 0) {
      return res.status(400).json({
        message: 'Founder is already associated with this company',
      });
    }

    await pool.query(
      'INSERT INTO founders (full_name, title, company_id) VALUES ($1, $2, $3)',
      [full_name, title, id] // Pass the company ID when inserting the founder
    );

    res.json({ message: 'Founder added successfully' });
  } catch (error) {
    next(error);
  }
};

const getFoundersByCompanyId = async (req, res, next) => {
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
};

module.exports = {
  addFounder,
  getFoundersByCompanyId,
};
