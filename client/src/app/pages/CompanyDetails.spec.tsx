import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CompanyDetails from './CompanyDetails';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Route } from 'react-router-dom';

const mock = new MockAdapter(axios);

describe('Details', () => {
  const mockResponse = {
    companyId: 1,
    name: 'Test Company 1',
    city: 'Seattle',
    state: 'Washington',
    description: 'Tasdfasf asfasf agsasgag',
    founded: new Date('1991-09-09').toISOString(),
  };
  const mockFounders = [
    {
      firstName: 'Matthew',
      lastName: 'Robert',
      title: 'CEO',
      companyId: '1',
    },
    {
      firstName: 'John',
      lastName: 'Harry',
      title: 'CEO',
      companyId: '1',
    },
  ];

  beforeEach(() => {
    mock.onGet('/api/companies/1').reply(200, mockResponse);
    mock.onGet('/api/founders/1').reply(200, mockFounders);
    mock.onPost('/api/founders/').reply(200, null);

    mock.onDelete('/api/companies/1').reply(200, null);
  });

  it('should render list of companies', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Route path='/details/:companyId'>
          <CompanyDetails />
        </Route>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(getByText(mockResponse.name)).toBeVisible();
    });
  });
});
