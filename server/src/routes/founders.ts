import express from 'express';
import poolConnection from '../connection';
import { promisify } from 'util';
import { Founder } from '../types';


const router = express.Router();
router.get('/founders', async (_req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));

  const result: Founder[] = await query("SELECT * FROM founders");
  connection.destroy();

  res.json(result)

});

router.post('/founders', async (req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));
  const data = req.body;

  const company: Founder = {
    firstName: data.firstName,
    lastName: data.lastName,
    title: data.title
  }
  try {
    const result = await query("INSERT INTO founders SET ?", company);
    connection.destroy();

    if (result.insertId) {
      res.json({ founderId: result.insertId })

    }
  }
  catch (error) {
    res.status(500).json({ error: `There was an error while inserting: ${error}` })
    connection.destroy();
  }

});


export default router