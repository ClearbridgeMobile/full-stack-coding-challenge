module.exports.init = async (client) => {
    await client.query(`
    CREATE TABLE IF NOT EXISTS founders
    (
        id serial not null PRIMARY KEY, 
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uuid char(36) not null, 
        text varchar(100) not null, 
        user_id INT not null
    );  
    `)
    console.log('created Table founders')
    await client.query(`
    CREATE TABLE IF NOT EXISTS companies
    (
        id serial not null PRIMARY KEY,
        name varchar(100) not null,
        location_city varchar(100) not null,
        Location_state varchar(100) not null,
        founded_date varchar(50) not null,
        description varchar(256) not null,
        constraint founder_id FOREIGN key(id) REFERENCES test2(id),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `)
    console.log('created Table companies')
}
