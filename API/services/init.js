const { Client } = require('pg')
const table = require('../db/init');

module.exports.init = async function() {
    try {
        const client = new Client({
            host: process.env.POSTGRESQL_HOST,
            port: process.env.POSTGRESQL_PORT,
            database: process.env.DB_NAME,
            user: process.env.USERNAME,
            password: process.env.PASSWORD
        });
        console.log('about to connect')
        client.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        })
        console.log('after connection')
        await table.init(client);
        client.end();
    } catch (e) {
        console.log('not connected')
        console.error(e);
    }
}
