import React from 'react';
import { render } from '@testing-library/react';
import CompanyPanel from '../components/CompanyPanel';

describe('CompanyPanel Component', () => {
  it('renders company information correctly', () => {
    const company = {
      companyId: 1,
      name: 'Company 1',
      city: 'City',
      state: 'State',
      description: 'At Innovative Solutions we are dedicated to pushing the boundaries of technological advancement.',
    };

    const { getByText } = render(<CompanyPanel company={company} />);

    expect(getByText(/company 1/i)).toBeInTheDocument();
    expect(getByText(/city, state/i)).toBeInTheDocument();
    expect(getByText(/At Innovative Solutions we are dedicated to pushing the boundaries of technological advancement\./i)).toBeInTheDocument();
  });
});
