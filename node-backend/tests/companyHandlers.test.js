const companyHandlers = require('../src/handlers/companyHandlers');
const companyModel = require('../src/models/companyModel');
const utils = require('../src/utils/utils');

jest.mock('../src/models/companyModel');
jest.mock('../src/utils/utils');

describe('companyHandlers', () => {
  // Mock Express response object
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCompanies', () => {
    it('should respond with JSON results on success', () => {
      const mockCompanies = [{ id: 1, name: 'Company A' }];
      companyModel.getAllCompanies.mockImplementation((callback) => {
        callback(null, mockCompanies);
      });

      companyHandlers.getAllCompanies(null, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockCompanies);
    });

    it('should handle internal server error', () => {
      const mockError = new Error('Test error');
      companyModel.getAllCompanies.mockImplementation((callback) => {
        callback(mockError, null);
      });

      companyHandlers.getAllCompanies(null, mockResponse);

      expect(utils.handleInternalServerError).toHaveBeenCalledWith(mockError, mockResponse);
    });
  });
});
