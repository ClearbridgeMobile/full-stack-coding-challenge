const request = require('supertest');
const express = require('express');
const founderRoute = require('../routes/FounderRoutes');


jest.mock('../config/db');
jest.mock('../utils/SQLUtils');
jest.mock('../utils/Utils');

describe('founderRoute', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', founderRoute);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /founder/:companyId - returns founders by company ID', async () => {
    const companyId = 123;
    const response = await request(app).get(`/founder/${companyId}`);
    expect(response.status).toBe(200);
  });

  test('POST / - creates a new founder', async () => {
    const newFounder = {
      companyId: 123,
      firstName: 'John',
      lastName: 'Doe',
      title: 'CEO',
    };
    const response = await request(app).post('/').send(newFounder);
    expect(response.status).toBe(200);
  });

  test('POST /validate - validates founder existence', async () => {
    const founderData = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const response = await request(app).post('/validate').send(founderData);
    expect(response.status).toBe(200);
  });
});
