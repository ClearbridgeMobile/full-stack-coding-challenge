module.exports.init = async (client) => {
    await client.query(`
    CREATE TABLE IF NOT EXISTS companies_info
    (
        id serial not null PRIMARY KEY,
        name varchar(100) not null,
        location_city varchar(100) not null,
        location_state varchar(100) not null,
        founded_date varchar(50) not null,
        founder_full_name varchar(100) not null,
        founder_position varchar(100) not null,
        description varchar(256) not null,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Table "companies_info" created');
            console.log(result);
        }
    })
}
