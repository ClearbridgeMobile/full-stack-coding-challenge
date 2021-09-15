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

router.get('/founders/:companyId', async (req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));
  const companyId = req.params.companyId;
  try {
    const result: Founder[] = await query("SELECT * FROM founders WHERE companyId = ?", companyId);
    connection.destroy();

    if (result.length) {
      res.json(result)

    }

  }
  catch (error) {
    res.status(500).json({ error: `There was an error while getting founders: ${error}` })
    connection.destroy();
  }

});


router.post('/founders', async (req, res) => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));
  const data = req.body;

  try {
    for (const d of data) {
      const founder: Founder = {
        firstName: d.firstName,
        lastName: d.lastName,
        title: d.title,
        companyId: d.companyId
      }

      if (d.firstName.length && d.lastName.length && d.title.length) {
        if (d.founderId) {
          await query("UPDATE founders SET firstName = ?, lastName = ?, title = ? WHERE founderId = ?", [d.firstName, d.lastName, d.title, d.founderId]);
        }
        else {
          await query("INSERT INTO founders SET ?", founder);
        }
      }

    }

    connection.destroy();
    res.json(null)


  }
  catch (error) {
    res.status(500).json({ error: `There was an error while inserting: ${error}` })
    connection.destroy();
  }

});


export default router