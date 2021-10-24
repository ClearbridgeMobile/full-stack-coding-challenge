const { Client } = require('pg')
// const { Pool } = require('pg');
const table = require('./create-table');
let ifClientConnected = false;
const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.DB_NAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD
});
module.exports.init = async () => {
    if(client && ifClientConnected) {
        console.log('client defined', JSON.stringify(client))
        return client;
    } else {
        try {
            await client.connect();
            ifClientConnected = true;
            await table.init(client);
            return client;
        } catch (e) {
            console.error(e);
        }
    }
}
