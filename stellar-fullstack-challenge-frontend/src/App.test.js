import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  test('renders CompaniesView by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Add company')).toBeInTheDocument();
  });

  test('navigates to CreateOrEditCompany on clicking a link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const createEditCompanyLink = screen.getByText('Add company');
    expect(createEditCompanyLink).toBeInTheDocument();
    createEditCompanyLink.click();
    expect(screen.getByText('Create a new company')).toBeInTheDocument();
  });

  test('navigates to CompanyView on clicking a link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const companyViewLink = screen.getByText('more..');
    expect(companyViewLink).toBeInTheDocument();
    companyViewLink.click();
    expect(screen.getByText('Founders')).toBeInTheDocument();
  });

  test('renders "Page not found!" for unknown routes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const unknownRouteLink = screen.getByText('Unknown Route');
    expect(unknownRouteLink).toBeInTheDocument();
    unknownRouteLink.click();
    expect(screen.getByText('Page not found!')).toBeInTheDocument();
  });
});
