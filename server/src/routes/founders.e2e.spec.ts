import app from '../bootstrap';
import supertest from 'supertest';
import poolConnection from '../connection';
import randomstring from 'randomstring';
import { promisify } from 'util';

const request = supertest(app);

beforeEach(async () => {
  const connection = await poolConnection();
  const query = promisify(connection.query.bind(connection));

  await query('SET FOREIGN_KEY_CHECKS=0;');
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

    await query(`INSERT INTO founders (firstName, lastName, title) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}")`)

    await query(`INSERT INTO founders (firstName, lastName, title) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}")`)

    await query(`INSERT INTO founders (firstName, lastName, title) 
    VALUES("${randomstring.generate(5)}", "${randomstring.generate(5)}", "${randomstring.generate(5)}")`)
    connection.destroy();

    const res = await request.get('/api/founders')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.type).toEqual('application/json');

  });
});

describe('POST "/api/founders"', () => {
  it('should save founder', async () => {
    let res = await request.get('/api/founders')
    expect(res.body).toHaveLength(0);

    const mockBody = {
      firstName: randomstring.generate(5),
      lastName: randomstring.generate(5),
      title: randomstring.generate(5)
    }
    await request.post('/api/founders').send(mockBody);
    res = await request.get('/api/founders');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    expect(res.body[0]).toHaveProperty('founderId');

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

