import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import AddFounder from '../components/AddFounder';
import * as founderServices from '../services/founderServices';

jest.mock('../services/founderServices');
  
describe('AddFounder Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <Router>
        <AddFounder />
      </Router>
    );
  };

  it('renders without crashing', () => {
    renderComponent();
  });

  it('initializes with the correct initial state', () => {
    const { getByLabelText } = renderComponent();

    expect(getByLabelText('FounderName:')).toHaveValue('');
    expect(getByLabelText('Title:')).toHaveValue('');
  });

  it('updates formData on input change', () => {
    const { getByLabelText } = renderComponent();

    act(() => {
      fireEvent.change(getByLabelText('FounderName:'), { target: { name: 'founderName', value: 'John Doe' } });
    });

    expect(getByLabelText('FounderName:')).toHaveValue('John Doe');
  });

  it('displays error message on form submission failure', async () => {
    const mockErrorMessage = 'Failed to add founder';

    founderServices.addFounder.mockResolvedValueOnce({ success: false, error: mockErrorMessage });

    const { getByLabelText, getByText } = renderComponent();

    act(() => {
      fireEvent.change(getByLabelText('FounderName:'), { target: { name: 'founderName', value: 'John Doe' } });
      fireEvent.change(getByLabelText('Title:'), { target: { name: 'title', value: 'CEO' } });
      fireEvent.submit(getByText('Add Founder'));
    });

    await waitFor(() => {
      expect(getByText(mockErrorMessage)).toBeInTheDocument();
    });
  });
});
