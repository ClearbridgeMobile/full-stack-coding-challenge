const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test', // Connect to the newly created database
  password: '', //Add your password here
  port: 5432,
});

(async () => {
  const client = await pool.connect();

  try {
    // Create companies table
    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        short_description TEXT NOT NULL,
        long_description TEXT NOT NULL,
        founded_date DATE
      )
    `);

    // Seed companies table
    await client.query(`
      INSERT INTO companies (name, city, state, short_description, long_description, founded_date)
      VALUES
      ('Tech Solutions Inc', 'New York', 'NY', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2005-08-15'),
      ('InnovateHub', 'San Francisco', 'CA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2010-04-22'),
      ('CodeGenius', 'Seattle', 'WA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2008-11-30'),
      ('DataMinds', 'Los Angeles', 'CA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2015-06-10'),
      ('ByteForge', 'Chicago', 'IL', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2012-09-18'),
      ('Nextron', 'New York', 'NY', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2007-02-03'),
      ('WebVista', 'San Francisco', 'CA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2018-12-28'),
      ('CyberNexa', 'Seattle', 'WA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2011-07-14'),
      ('FutureTech', 'Los Angeles', 'CA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2009-03-25'),
      ('Visionary Systems', 'Chicago', 'IL', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '2014-10-07')
    `);

    // Create founders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS founders (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        title TEXT NOT NULL,
        company_id INTEGER REFERENCES companies(id)
      )
    `);

    // Seed founders table
    await client.query(`
      INSERT INTO founders (full_name, title, company_id)
      VALUES
      ('John Smith', 'CEO', 1),
      ('Jane Doe', 'CEO', 2),
      ('David Johnson', 'CEO', 3),
      ('Emily Brown', 'CEO', 4),
      ('Michael Wilson', 'CEO', 5),
      ('Sarah Martinez', 'CEO', 6),
      ('James Jones', 'CEO', 7),
      ('Mary Taylor', 'CEO', 8),
      ('Robert Anderson', 'CEO', 9),
      ('Linda Thomas', 'CEO', 10)
    `);

    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up database:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
})();
