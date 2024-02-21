import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddCompanyButton from '../components/AddCompanyButton';

describe('AddCompanyButton Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AddCompanyButton navigate={() => {}} />
      </BrowserRouter>
    );
  });

  it('calls navigate when the button is clicked', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <AddCompanyButton navigate={navigateMock} />
      </BrowserRouter>
    );

    const addButton = getByText('Add Company');
    fireEvent.click(addButton);

    expect(navigateMock).toHaveBeenCalledWith('/add-company');
  });
});
