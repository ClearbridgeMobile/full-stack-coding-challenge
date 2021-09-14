import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CompanyList from './List';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('List', () => {
  it('should render list of companies', async () => {
    const mockResponse = [
      {
        companyId: 1,
        name: 'Test Company 1',
        city: 'Seattle',
        state: 'Washington',
        description: 'Tasdfasf asfasf agsasgag',
        founded: new Date('1991-09-09').toISOString(),
      },
      {
        companyId: 2,
        name: 'Test Company 2',
        city: 'Orlando',
        state: 'Florida',
        description: 'Some asd',
        founded: new Date('1998-04-19').toISOString(),
      },
    ];
    mock.onGet('/api/companies').reply(200, mockResponse);

    const { getByText } = render(<CompanyList />);
    await waitFor(() => {
      expect(getByText(mockResponse[0].name)).toBeVisible();

      expect(getByText(mockResponse[1].name)).toBeVisible();
    });
  });
});
