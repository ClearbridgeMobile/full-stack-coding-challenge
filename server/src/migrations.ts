import poolConnection from './connection';
import { promisify } from 'util';
import { format } from 'fecha';

import { Company, Founder } from 'types';

poolConnection().then((connection) => {

  const query = promisify(connection.query.bind(connection));

  createTables().then(() => {
    if (process.env.NODE_ENV !== 'test') {
      seedData().finally(() => console.log('done'));
    }
    else {
      connection.destroy();
    }
  }).finally(() => console.log('done'));



  async function createTables() {
    await Promise.all([
      query(`CREATE TABLE companies(
      companyId MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(50) NOT NULL,
      city VARCHAR(50) NOT NULL,
      state VARCHAR(50) NOT NULL,
      description VARCHAR(255),
      founded date,
      founderId MEDIUMINT(8) UNSIGNED,
      createdAt datetime default CURRENT_TIMESTAMP,
      updatedAt datetime on update CURRENT_TIMESTAMP,
      PRIMARY KEY(companyId)
      );`),
      query(`CREATE TABLE founders(
      founderId MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      title VARCHAR(50),
      createdAt datetime default CURRENT_TIMESTAMP,
      updatedAt datetime on update CURRENT_TIMESTAMP,
      PRIMARY KEY (founderId)
    );`)
    ]);
  }
  async function seedData() {


    const companies: Company[] = [
      {
        name: 'Toys Forever',
        city: 'Chicago',
        state: 'Illinois',
        description: "This company makes toys",
        founded: new Date('1980-01-01')
      },
      {
        name: 'Zoom Inc',
        city: 'Houston',
        state: 'Texas',
        description: "This company makes cars",
        founded: new Date('1975-11-05')

      },
      {
        name: 'Electric World',
        city: 'San Diego',
        state: 'California',
        description: "This company sells TV",
        founded: new Date('1982-03-05')

      },
      {
        name: 'Crunchy',
        city: 'New York',
        state: 'New York',
        description: "This company makes chips and snacks",
        founded: new Date('1992-01-22')

      },
      {
        name: 'Homes Inc',
        city: 'Seattle',
        state: 'Washington',
        description: "This company makes buildings",
        founded: new Date('1972-04-08')

      },
      {
        name: 'Shades for You',
        city: 'Denver',
        state: 'Colorado',
        description: "This company makes curtains",
        founded: new Date('1971-04-08')

      },
      {
        name: 'Fans, Fans, Fans Inc',
        city: 'Las Vegas',
        state: 'Nevada',
        description: "This company makes fans",
        founded: new Date('1989-06-01')

      },
      {
        name: 'Rock N Hard',
        city: 'Detroit',
        state: 'Michigan',
        description: "This company makes guitars",
        founded: new Date('1979-01-11')

      },
      {
        name: 'Soft Like Sheet',
        city: 'Orlando',
        state: 'Florida',
        description: "This company makes bedsheets",
        founded: new Date('1986-05-18')
      },
      {
        name: 'Bottles Inc',
        city: 'Jersey City',
        state: 'New Jersey',
        description: "This company makes plastic bottles",
        founded: new Date('2008-01-18')
      },
      {
        name: 'Boxes 4 Ever',
        city: 'Toledo',
        state: 'Ohio',
        description: "This company makes boxes",
        founded: new Date('2011-11-01')

      },
      {
        name: 'Sleep Inc',
        city: 'Miami',
        state: 'Florida',
        description: "This company makes beds",
        founded: new Date('2017-03-07')

      }
    ]

    const founders: Founder[] = [
      {
        firstName: 'Mark',
        lastName: 'Anthony',
        title: 'CEO'
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        title: 'CEO'
      },
      {
        firstName: 'Alex',
        lastName: 'Richards',
        title: 'CEO'
      },
      {
        firstName: 'Ahmad',
        lastName: 'Zafir',
        title: 'CEO'
      },
      {
        firstName: 'Susan',
        lastName: 'Johnson',
        title: 'CEO'
      },
      {
        firstName: 'Larry',
        lastName: 'Spielberg',
        title: 'CEO'
      },
      {
        firstName: 'Jennifer',
        lastName: 'Hardly',
        title: 'CEO'
      },
      {
        firstName: 'Lawrence',
        lastName: 'Arabia',
        title: 'CEO'
      },
      {
        firstName: 'Mary',
        lastName: 'Shelley',
        title: 'CEO'
      },
      {
        firstName: 'Wang',
        lastName: 'Xu',
        title: 'CEO'
      },
      {
        firstName: 'Matthew',
        lastName: 'Engleberg',
        title: 'CEO'
      },
      {
        firstName: 'Chan',
        lastName: 'Lee',
        title: 'CEO'
      },
    ]


    for (let i = 0; i < companies.length; i = i + 1) {
      const insertResult: any = await query(`INSERT INTO founders(firstName, lastName, title) VALUES ("${founders[i].firstName}",  "${founders[i].lastName}", "${founders[i].title}")`)

      await query(`INSERT INTO companies(name, city, state,description, founded, founderId) VALUES ("${companies[i].name}",  "${companies[i].city}", "${companies[i].state}", "${companies[i].description}", "${format(companies[i].founded, 'YYYY-MM-DD')}", "${insertResult.insertId}")`)

    }
    connection.destroy();


  }
});

