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
    jest.restoreAllMocks();
  });

  it('should log the error and send a 500 response', () => {
    const mockError = new Error('Test error');
    utils.handleInternalServerError(mockError, mockRes);

    expect(console.error).toHaveBeenCalledWith('Error executing query:', mockError);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal Server Error');
  });
});

describe('buildSetClauses', () => {
  it('should build setClauses and queryValues for valid fields', () => {
    const fields = { name: 'John', age: 30, city: undefined };
    const result = utils.buildSetClauses(fields);

    expect(result.query).toBe('name = ?, age = ?');
    expect(result.values).toEqual(['John', 30]);
  });

  it('should handle empty fields', () => {
    const fields = {};
    const result = utils.buildSetClauses(fields);

    expect(result.query).toBe('');
    expect(result.values).toEqual([]);
  });
});

describe('validateRequiredFields', () => {
    let mockRes;
  
    beforeEach(() => {
      mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
      };
    });
  
    it('should return true for valid fields', () => {
      const fields = ['John', 30];
      const result = utils.validateRequiredFields(fields, mockRes);
  
      expect(result).toBe(true);
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  
    it('should return false and send an error response for empty fields', () => {
      const fields = ['John', undefined];
      const result = utils.validateRequiredFields(fields, mockRes);
  
      expect(result).toBe(false);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'All fields are required' });
    });
  });
  
  
