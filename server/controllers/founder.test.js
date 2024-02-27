const app = require('../index');
const request = require('supertest')(app);
const { pool } = require('../db');

describe('Founders Controller', () => {
  afterAll(async () => {
    await pool.end();
  });

  describe('POST /companies/:id/founders', () => {
    it('should add a new founder to a company', async () => {
      const companyId = 1; // Replace with a valid company ID
      const res = await request.post(`/companies/${companyId}/founders`).send({
        full_name: 'Test Founder',
        title: 'CEO',
        id: companyId,
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual('Founder added successfully');
      expect(res.body.founder).toHaveProperty('id');
      expect(res.body.founder).toHaveProperty('full_name', 'Test Founder');
      expect(res.body.founder).toHaveProperty('title', 'CEO');
      expect(res.body.founder).toHaveProperty('company_id', companyId);
    });

    it('should return a 400 error if the founder already exists in another company', async () => {
      const companyId = 1; // Replace with a valid company ID
      const res = await request.post(`/companies/${companyId}/founders`).send({
        full_name: 'Test Founder',
        title: 'CEO',
        id: companyId,
      });

      const res2 = await request
        .post(`/companies/${companyId + 1}/founders`)
        .send({
          full_name: 'Test Founder',
          title: 'CEO',
          id: companyId + 1,
        });

      expect(res2.statusCode).toEqual(400);
      expect(res2.body.message).toEqual(
        'Founder is already associated with another company'
      );
    });

    it('should return a 400 error if the founder already exists in the same company', async () => {
      const companyId = 1; // Replace with a valid company ID
      const res = await request.post(`/companies/${companyId}/founders`).send({
        full_name: 'Test Founder',
        title: 'CEO',
        id: companyId,
      });

      const res2 = await request.post(`/companies/${companyId}/founders`).send({
        full_name: 'Test Founder',
        title: 'CEO',
        id: companyId,
      });

      expect(res2.statusCode).toEqual(400);
      expect(res2.body.message).toEqual(
        'Founder is already associated with this company'
      );
    });
  });

  describe('GET /companies/:id/founders', () => {
    it('should get all founders for a company', async () => {
      const companyId = 1; // Replace with a valid company ID
      const res = await request.get(`/companies/${companyId}/founders`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((founder) => {
        expect(founder).toHaveProperty('id');
        expect(founder).toHaveProperty('full_name');
        expect(founder).toHaveProperty('title');
        expect(founder).toHaveProperty('company_id', companyId);
      });
    });

    it('should return a 404 error if the company is not found', async () => {
      const companyId = 999; // Replace with an invalid company ID
      const res = await request.get(`/companies/${companyId}/founders`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('Company not found');
    });
  });
});
