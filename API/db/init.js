// const { Client } = require('pg')
const { Pool } = require('pg');
const table = require('./create-table');
let client;
const pool = new Pool({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.DB_NAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD
});
module.exports.init = async () => {
    if(client) {
        console.log('client defined', JSON.stringify(client))
        return client;
    } else {
        try {
            console.log('pool.connect', JSON.stringify(pool.connect));
            client = await pool.connect();
            await table.init(client);
            return client;
        } catch (e) {
            console.error(e);
        }
    }
}
