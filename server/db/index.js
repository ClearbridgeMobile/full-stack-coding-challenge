const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'companies_dir',
  password: 'nitsua',
  port: 5432,
});

module.exports = pool;
