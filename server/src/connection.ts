
import { config } from 'node-config-ts';
import mysql from 'mysql';
import { promisify } from 'util';

const pool = mysql.createPool({
  host: config.Database.host,
  user: config.Database.user,
  password: config.Database.password,
  database: config.Database.database,
});

const poolConnection = promisify(pool.getConnection.bind(pool));

export default poolConnection;

