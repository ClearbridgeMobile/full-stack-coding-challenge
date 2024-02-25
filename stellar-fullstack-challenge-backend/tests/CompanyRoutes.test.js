const request = require('supertest');
const express = require('express');
const companyRoute = require('../routes/CompanyRoutes');

// Mocking dependencies
jest.mock('../config/db');
jest.mock('../utils/SQLUtils');
jest.mock('../utils/Utils');

describe('companyRoute', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', companyRoute);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET / - returns all companies', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  test('GET /:id - returns company by ID', async () => {
    const companyId = 123;
    const response = await request(app).get(`/${companyId}`);
    expect(response.status).toBe(200);
  });

  test('POST / - creates a new company', async () => {
    const newCompany = {
      companyName: 'Test Company',
      foundedDate: '2022-01-01',
      city: 'Test City',
      state: 'Test State',
      description: 'Test Description',
    };
    const response = await request(app).post('/').send(newCompany);
    expect(response.status).toBe(200);
  });

  test('PUT / - updates an existing company', async () => {
    const updatedCompany = {
      companyName: 'Updated Test Company',
      foundedDate: '2022-02-02',
      city: 'Updated Test City',
      state: 'Updated Test State',
      description: 'Updated Test Description',
      companyId: 123,
    };
    const response = await request(app).put('/').send(updatedCompany);
    expect(response.status).toBe(200);
  });

  test('DELETE /:id - deletes a company by ID', async () => {
    const companyId = 123;
    const response = await request(app).delete(`/${companyId}`);
    expect(response.status).toBe(200);
  });
});
