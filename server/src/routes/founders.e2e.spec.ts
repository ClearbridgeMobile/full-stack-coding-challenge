import app from '../bootstrap';
import supertest from 'supertest';
import poolConnection from '../connection';
import randomstring from 'randomstring';
import { promisify } from 'util';
import { format } from 'fecha';
import { Founder } from '../types';

const request = supertest(app);

beforeEach(async () => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));

  await query('SET FOREIGN_KEY_CHECKS=0;');
  await query('TRUNCATE `clearbridge_test`.companies;');
  await query('TRUNCATE `clearbridge_test`.founders;');

  connection.destroy();

});

describe('GET "/api/founders"', () => {
  it('should return an empty list if no founders', async () => {
    const res = await request.get('/api/founders')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
    expect(res.type).toEqual('application/json');
  });

  it('should return a list of founders', async () => {
    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));
    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');

    const company1 = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    const company2 = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)


    await query(`INSERT INTO founders (firstName, lastName, title, companyId) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}", "${company1.insertId}")`)

    await query(`INSERT INTO founders (firstName, lastName, title, companyId) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}", "${company1.insertId}")`)

    await query(`INSERT INTO founders (firstName, lastName, title, companyId) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}", "${company2.insertId}")`)
    connection.destroy();

    const res = await request.get('/api/founders')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.type).toEqual('application/json');

  });
});

describe('GET "/api/founders/:companyId"', () => {
  it('should return a list of founders by company', async () => {
    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));

    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');
    const company1 = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    const company2 = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)

    await query(`INSERT INTO founders (firstName, lastName, title, companyId) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}", "${company1.insertId}")`)

    await query(`INSERT INTO founders (firstName, lastName, title, companyId) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}", "${company1.insertId}")`)

    await query(`INSERT INTO founders (firstName, lastName, title, companyId) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}", "${company2.insertId}")`)

    connection.destroy();

    const res = await request.get(`/api/founders/${company1.insertId}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.type).toEqual('application/json');

  });
});

describe('POST "/api/founders"', () => {
  it('should save founders', async () => {
    const connection = await poolConnection();
    const query = promisify(connection.query.bind(connection));
    const date = format(new Date('1991-01-01'), 'YYYY-MM-DD');

    const company1 = await query(`INSERT INTO companies (name, city, state, description, founded) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}","${randomstring.generate(15)}", "${date}")`)
    connection.destroy();

    let res = await request.get('/api/founders')
    expect(res.body).toHaveLength(0);

    const mockBody: Founder[] = [{
      firstName: randomstring.generate(5),
      lastName: randomstring.generate(5),
      title: randomstring.generate(5),
      companyId: company1.insertId
    }]
    await request.post('/api/founders').send(mockBody);
    res = await request.get('/api/founders');
    expect(res.status).toBe(200);


  });

  it('should throw error if insert fails', async () => {
    let res = await request.get('/api/founders')
    expect(res.body).toHaveLength(0);

    const mockBody = {
      firstName: null,
      lastName: null,
      title: null
    }
    res = await request.post('/api/founders').send(mockBody);
    expect(res.status).toBe(500);

    res = await request.get('/api/founders')
    expect(res.body).toHaveLength(0);

  })
});

