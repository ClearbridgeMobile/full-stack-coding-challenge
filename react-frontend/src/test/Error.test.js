import React from 'react';
import { render } from '@testing-library/react';
import Error from '../components/Error';

describe('Error Component', () => {
  it('renders error message', () => {
    const { getByText } = render(<Error />);

    expect(getByText('Error Occured!!')).toBeInTheDocument();
    expect(getByText('Oops! Something went wrong. Please try again.')).toBeInTheDocument();
  });
});
