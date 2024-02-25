import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/'; 
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import CreateOrEditCompany from '../src/pages/create-company/CreateOrEditCompany';

describe('CreateOrEditCompany component', () => {
  const mockSetCompanies = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CreateOrEditCompany setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );
  });

  test('displays "Create a new company" when no company data is provided', () => {
    render(
      <BrowserRouter>
        <CreateOrEditCompany setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    expect(screen.getByText('Create a new company')).toBeInTheDocument();
  });

  test('displays "Edit Company" when company data is provided', async () => {
    const mockCompany = {
      companyName: 'Mock Company',
      state: 'Mock State',
      city: 'Mock City',
      foundedDate: '2022-01-01',
      description: 'Mock Description',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockCompany));

    render(
      <BrowserRouter>
        <CreateOrEditCompany setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    // Mock state with company data
    window.history.pushState({ company: mockCompany }, 'Edit Company', '/');

    expect(screen.getByText('Edit Company')).toBeInTheDocument();
  });

});
