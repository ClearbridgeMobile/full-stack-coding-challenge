const utils = require('../src/utils/utils');

describe('handleInternalServerError', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it('should log the error and send a 500 response', () => {
    const mockError = new Error('Test error');
    utils.handleInternalServerError(mockError, mockRes);

    expect(console.error).toHaveBeenCalledWith('Error executing query:', mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal Server Error');
  });
});