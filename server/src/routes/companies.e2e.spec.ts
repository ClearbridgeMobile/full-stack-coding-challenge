import app from '../bootstrap';
import supertest from 'supertest';
import poolConnection from '../connection';
import randomstring from 'randomstring';
import { promisify } from 'util';
import { format } from 'fecha';

const request = supertest(app);

beforeEach(async () => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));

  await query('SET FOREIGN_KEY_CHECKS=0;');
  await query('TRUNCATE `clearbridge_test`.companies;');

  connection.destroy();

});


describe('GET "/api/companies"', () => {
  it('should return an empty list if no companies', async () => {
    const res = await request.get('/api/companies')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
    expect(res.type).toEqual('application/json');
  });

  it('should return a list of companies', async () => {
    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));

    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');

    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)
    connection.destroy();

    const res = await request.get('/api/companies')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.type).toEqual('application/json');

  });
});

describe('GET "/api/companies/:companyId"', () => {
  it('should return a list of companies', async () => {
    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));

    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');

    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    const subject = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)
    connection.destroy();

    const res = await request.get(`/api/companies/${subject.insertId}`)
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ companyId: subject.insertId }));
    expect(res.type).toEqual('application/json');

  });
});

describe('POST "/api/companies"', () => {
  it('should save company', async () => {
    let res = await request.get('/api/companies')
    expect(res.body).toHaveLength(0);

    const mockBody = {
      name: randomstring.generate(5),
      city: randomstring.generate(5),
      state: randomstring.generate(5),
      description: randomstring.generate(35),
      founded: new Date('1991-09-09').toISOString().slice(0, 19).replace('T', ' ')
    }
    await request.post('/api/companies').send(mockBody);
    res = await request.get('/api/companies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('companyId');


  });

  it('should throw error if insert fails', async () => {
    let res = await request.get('/api/companies')
    expect(res.body).toHaveLength(0);

    const mockBody = {
      name: null,
      city: null,
      state: null,
      description: null,
      founded: null
    }
    res = await request.post('/api/companies').send(mockBody);
    expect(res.status).toBe(500);

    res = await request.get('/api/companies')
    expect(res.body).toHaveLength(0);

  })
});

describe('DELETE "/api/companies/:companyId"', () => {
  it('should delete company', async () => {
    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));

    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');
    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    const subject = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    await query(`INSERT INTO founders (firstName, lastName, title, companyId) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}", "${subject.insertId}")`)


    connection.destroy();

    let res = await request.get('/api/companies')
    expect(res.body).toHaveLength(3);


    await request.delete(`/api/companies/${subject.insertId}`)
    res = await request.get('/api/companies')
    expect(res.body).toHaveLength(2);

  });

  it('should not delete company if it does not exist', async () => {
    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));

    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');
    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)
    connection.destroy();

    let res = await request.get('/api/companies')
    expect(res.body).toHaveLength(3);


    await request.delete(`/api/companies/31414114`)
    res = await request.get('/api/companies')
    expect(res.body).toHaveLength(3);

  });


});

describe('PUT "/api/companies/:companyId"', () => {
  it('should update company', async () => {
    const newDate = format(new Date('2001-01-01'), 'YYYY-MM-DD');
    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');

    const mockBody = {
      name: 'Test Company',
      city: 'Memphis',
      state: 'Tennessee',
      description: 'Some description',
      founded: newDate
    }


    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));

    const subject = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)
    connection.destroy();

    await request.put(`/api/companies/${subject.insertId}`).send(mockBody);
    let res = await request.get('/api/companies')
    expect(res.body[0].name).toEqual(mockBody.name);
    expect(res.body[0].city).toEqual(mockBody.city);
    expect(res.body[0].state).toEqual(mockBody.state);
    expect(res.body[0].description).toEqual(mockBody.description);


  });

});
