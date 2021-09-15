import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CompanyList from './CompanyList';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const mock = new MockAdapter(axios);

describe('List', () => {
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
  beforeEach(() => {
    mock.onGet('/api/companies').reply(200, mockResponse);
  });

  it('should render list of companies', async () => {
    const { getByText } = render(<CompanyList />);
    await waitFor(() => {
      expect(getByText(mockResponse[0].name)).toBeVisible();

      expect(getByText(mockResponse[1].name)).toBeVisible();
    });
  });

  it('should redirect to "/create" on clicking "Add Company" button', async () => {
    const history = createMemoryHistory();
    history.push('/');

    const { getAllByText } = render(
      <Router history={history}>
        <CompanyList />
      </Router>,
    );
    const buttons = await waitFor(() => getAllByText('Add Company'));

    fireEvent.click(buttons[0]);

    expect(history.location.pathname).toBe('/create');
  });
});
