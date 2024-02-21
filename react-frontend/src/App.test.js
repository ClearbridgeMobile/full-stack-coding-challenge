import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore'; // Import your Redux store
import App from './App';

describe('App Component', () => {
  it('renders CompanyList component for the home route', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the asynchronous rendering to complete
    await waitFor(() => {
      expect(screen.getByText(/Companies/i)).toBeInTheDocument();
      expect(screen.getByText(/Loading/i)).toBeInTheDocument(); // Adjust if necessary
    });
  });

  it('renders CompanyDetails component for the company-details route', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/company-details/1']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the asynchronous rendering to complete
    await waitFor(() => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument(); // Adjust if necessary
    });
  });
});