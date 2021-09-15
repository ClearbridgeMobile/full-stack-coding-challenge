import express from 'express';
import poolConnection from '../connection';
import { promisify } from 'util';
import { Company } from '../types';


const router = express.Router();
router.get('/companies', async (_req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));

  const result: Company[] = await query("SELECT * FROM companies");
  connection.destroy();

  res.json(result)

});

router.get('/companies/:companyId', async (req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));
  const companyId = req.params.companyId;

  try {
    const result = await query("SELECT * FROM companies WHERE companyId = ?", companyId);
    connection.destroy();

    if (result[0]) {
      res.json(result[0])

    }

  }
  catch (error) {
    res.status(500).json({ error: `There was an error while getting companies: ${error}` })
    connection.destroy();
  }

});

router.post('/companies', async (req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));
  const data = req.body;

  const company: Company = {
    name: data.name,
    city: data.city,
    state: data.state,
    description: data.description,
    founded: data.founded
  }
  try {
    const result = await query("INSERT INTO companies SET ?", company);
    connection.destroy();

    if (result.insertId) {
      res.json({ companyId: result.insertId })
    }
  }
  catch (error) {
    res.status(500).json({ error: `There was an error while inserting: ${error}` })
    connection.destroy();
  }

});

router.delete('/companies/:companyId', async (req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));
  const companyId = req.params.companyId;

  try {
    const deleteFounders = await query("DELETE FROM founders WHERE companyId = ?", companyId);
    if (deleteFounders.affectedRows) {
      const result = await query("DELETE FROM companies WHERE companyId = ?", companyId);
      if (result.affectedRows) {
        connection.destroy();
        res.json(null)
      }
      else {
        connection.destroy();
        throw Error('could not delete companies')
      }
    }

    else {
      connection.destroy();
      throw Error('could not delete founders')
    }
  }
  catch (error) {
    res.status(500).json({ error: `There was an error while deleting: ${error}` })
    connection.destroy();
  }

});

router.put('/companies/:companyId', async (req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));
  const companyId = req.params.companyId;
  const data = req.body;

  try {
    const result = await query("UPDATE companies SET name = ?, city = ?, state = ?, description = ?, founded = ? WHERE companyId = ?", [data.name, data.city, data.state, data.description, data.founded, companyId]);

    if (result.affectedRows) {
      connection.destroy();
      res.json(null)
    }
    else {
      throw Error('nothing to update')
    }
  }
  catch (error) {
    res.status(500).json({ error: `There was an error while updating: ${error}` })
    connection.destroy();
  }

});

export default router