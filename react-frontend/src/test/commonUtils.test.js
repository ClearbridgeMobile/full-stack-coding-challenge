import { truncateDescription, formatDate } from '../utils/commonUtils';

describe('truncateDescription function', () => {
  it('does not truncate short description', () => {
    const description = 'Short description';
    const maxLength = 20;

    const result = truncateDescription(description, maxLength);

    expect(result).toEqual(description);
  });

  it('truncates long description', () => {
    const description = 'This is a long description that needs to be truncated';
    const maxLength = 20;

    const result = truncateDescription(description, maxLength);

    expect(result).toEqual('This is a long descr...');
  });

  it('handles empty description', () => {
    const description = '';
    const maxLength = 10;

    const result = truncateDescription(description, maxLength);

    expect(result).toEqual('');
  });
});

describe('formatDate function', () => {
  it('formats date string correctly', () => {
    const dateString = '2022-02-21T12:34:56.789Z';

    const result = formatDate(dateString);

    expect(result).toEqual('2022-02-21');
  });
});
