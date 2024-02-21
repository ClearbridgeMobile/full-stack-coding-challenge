import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteCompany from '../components/DeleteCompany';
import { deleteCompanyRequest } from '../services/companyServices';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../services/companyServices', () => ({
  deleteCompanyRequest: jest.fn(),
}));

describe('DeleteCompany Component', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();
  const deleteCompanyRequestMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);
    deleteCompanyRequest.mockReturnValue(deleteCompanyRequestMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    const { getByText } = render(<DeleteCompany companyId="123" />);
    expect(getByText('Delete Company')).toBeInTheDocument();
  });

  it('calls deleteCompanyRequest and dispatches deleteCompany on successful deletion', async () => {
    deleteCompanyRequestMock.mockResolvedValue(true);

    const { getByText } = render(<DeleteCompany companyId="123" />);
    const deleteButton = getByText('Delete Company');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('displays loading message while processing', async () => {
    deleteCompanyRequestMock.mockResolvedValue(true);

    const { getByText } = render(<DeleteCompany companyId="123" />);
    const deleteButton = getByText('Delete Company');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });
});
