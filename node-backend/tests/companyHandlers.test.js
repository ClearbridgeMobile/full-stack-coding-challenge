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

  describe('getCompanyById', () => {
    it('should respond with JSON result for a valid company ID', () => {
      const companyId = 1;
      const mockCompany = { id: companyId, name: 'Company A' };
      companyModel.getCompanyById.mockImplementation((id, callback) => {
        callback(null, [mockCompany]);
      });

      const mockRequest = { params: { id: companyId } };
      companyHandlers.getCompanyById(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockCompany);
    });

    it('should handle internal server error', () => {
      const companyId = 1;
      const mockError = new Error('Test error');
      companyModel.getCompanyById.mockImplementation((id, callback) => {
        callback(mockError, null);
      });

      const mockRequest = { params: { id: companyId } };
      companyHandlers.getCompanyById(mockRequest, mockResponse);

      expect(utils.handleInternalServerError).toHaveBeenCalledWith(mockError, mockResponse);
    });

    it('should handle company not found', () => {
      const companyId = 1;
      companyModel.getCompanyById.mockImplementation((id, callback) => {
        callback(null, []);
      });

      const mockRequest = { params: { id: companyId } };
      companyHandlers.getCompanyById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Company not found' });
    });
  });

  describe('createCompany', () => {  
    it('should validate required fields', () => {
      const mockCompanyData = { name: 'New Company', city: 'City' }; // Missing required fields
      const mockRequest = { body: mockCompanyData };

      companyHandlers.createCompany(mockRequest, mockResponse);

      expect(utils.validateRequiredFields).toHaveBeenCalledWith(
        ['New Company', 'City', undefined, undefined],
        mockResponse
      );
    });
  });

  describe('updateCompany', () => {
    it('should respond with affectedRows on successful update', () => {
      const companyId = 1;
      const mockCompanyData = { name: 'Updated Company', city: 'City', state: 'State', description: 'Description' };
      const mockSetClauses = { query: 'name = ?, city = ?, state = ?, description = ?', values: ['Updated Company', 'City', 'State', 'Description'] };
      const mockUpdatedRows = 1;
      companyModel.updateCompany.mockImplementation((...args) => {
        const callback = args[args.length - 1];
        callback(null, { affectedRows: mockUpdatedRows });
      });

      const mockRequest = { body: mockCompanyData, params: { id: companyId } };
      companyHandlers.updateCompany(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({ affectedRows: mockUpdatedRows });
    });

    it('should handle internal server error', () => {
      const companyId = 1;
      const mockCompanyData = { name: 'Updated Company', city: 'City', state: 'State', description: 'Description' };
      const mockError = new Error('Test error');
      companyModel.updateCompany.mockImplementation((...args) => {
        const callback = args[args.length - 1];
        callback(mockError, null);
      });

      const mockRequest = { body: mockCompanyData, params: { id: companyId } };
      companyHandlers.updateCompany(mockRequest, mockResponse);

      expect(utils.handleInternalServerError).toHaveBeenCalledWith(mockError, mockResponse);
    });
  });

  describe('deleteCompany', () => {
    it('should respond with 204 status on successful deletion', () => {
      const companyId = 1;
      const mockDeletedRows = 1;
      companyModel.deleteCompany.mockImplementation((...args) => {
        const callback = args[args.length - 1];
        callback(null, { affectedRows: mockDeletedRows });
      });

      const mockRequest = { params: { id: companyId } };
      companyHandlers.deleteCompany(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should handle internal server error', () => {
      const companyId = 1;
      const mockError = new Error('Test error');
      companyModel.deleteCompany.mockImplementation((...args) => {
        const callback = args[args.length - 1];
        callback(mockError, null);
      });

      const mockRequest = { params: { id: companyId } };
      companyHandlers.deleteCompany(mockRequest, mockResponse);

      expect(utils.handleInternalServerError).toHaveBeenCalledWith(mockError, mockResponse);
    });

    it('should handle company not found', () => {
      const companyId = 1;
      companyModel.deleteCompany.mockImplementation((...args) => {
        const callback = args[args.length - 1];
        callback(null, { affectedRows: 0 });
      });

      const mockRequest = { params: { id: companyId } };
      companyHandlers.deleteCompany(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Company not found' });
    });
  });
});
