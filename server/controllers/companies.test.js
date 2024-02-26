const app = require('../index');
const request = require('supertest')(app);
const { pool } = require('../db');

describe('Companies Controller', () => {
  afterAll(async () => {
    await pool.end();
  });

  describe('POST /companies', () => {
    it('should create a new company', async () => {
      const res = await request.post('/companies').send({
        name: 'Test Company',
        city: 'Test City',
        state: 'Test State',
        short_description: 'Test short description',
        long_description: 'Test long description',
        founded_date: '2022-01-01',
      });

      expect(res.body.message).toEqual('Company created successfully');
      expect(res.body.company).toHaveProperty('id');
      expect(res.body.company).toHaveProperty('name', 'Test Company');
      expect(res.body.company).toHaveProperty('city', 'Test City');
      expect(res.body.company).toHaveProperty('state', 'Test State');
      expect(res.body.company).toHaveProperty(
        'short_description',
        'Test short description'
      );
      expect(res.body.company).toHaveProperty(
        'long_description',
        'Test long description'
      );
    });

    it('should return a 400 error if the company already exists', async () => {
      await request.post('/companies').send({
        name: 'Test Company',
        city: 'Test City',
        state: 'Test State',
        short_description: 'Test short description',
        long_description: 'Test long description',
        founded_date: '2022-01-01',
      });

      const res = await request.post('/companies').send({
        name: 'Test Company',
        city: 'Test City',
        state: 'Test State',
        short_description: 'Test short description',
        long_description: 'Test long description',
        founded_date: '2022-01-01',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Company with this name already exists');
    });
  });
});
