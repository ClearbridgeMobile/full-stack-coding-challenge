import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for expect(...).toBeInTheDocument()
import { BrowserRouter } from 'react-router-dom';
import CompaniesView from '../src/pages/companies-view/CompaniesView';


describe('CompaniesView component', () => {
  const mockCompanies = [
    {
      companyName: 'Company 1',
      city: 'City 1',
      state: 'State 1',
      description: 'Description 1',
      companyId: 1,
    },
    {
      companyName: 'Company 2',
      city: 'City 2',
      state: 'State 2',
      description: 'Description 2',
      companyId: 2,
    },
  ];

  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CompaniesView companies={[]} />
      </BrowserRouter>
    );
  });

  test('renders company cards correctly', () => {
    render(
      <BrowserRouter>
        <CompaniesView companies={mockCompanies} />
      </BrowserRouter>
    );

    // Check if each company card is rendered
    mockCompanies.forEach((company) => {
      expect(screen.getByText(company.companyName)).toBeInTheDocument();
      expect(screen.getByText(`${company.city},${company.state}`)).toBeInTheDocument();
      expect(screen.getByText(company.description)).toBeInTheDocument();
    });
  });

  test('clicking "more.." button navigates to company view', () => {
    render(
      <BrowserRouter>
        <CompaniesView companies={mockCompanies} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTitle(1));

    // Check if navigation is correct
    expect(window.location.pathname).toBe('/company-view/1');
  });

  test('clicking "Add company" button navigates to create-edit-company', () => {
    render(
      <BrowserRouter>
        <CompaniesView companies={mockCompanies} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Add company'));

    // Check if navigation is correct
    expect(window.location.pathname).toBe('/create-edit-company');
  });
});
