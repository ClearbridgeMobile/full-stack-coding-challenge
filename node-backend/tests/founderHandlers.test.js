const founderHandlers = require('../src/handlers/founderHandlers');
const founderModel = require('../src/models/founderModel');
const utils = require('../src/utils/utils');

jest.mock('../src/models/founderModel');
jest.mock('../src/utils/utils');

describe('founderHandlers', () => {
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllFoundersByCompanyId', () => {
    it('should respond with JSON results on success', () => {
      const companyId = '123';
      const mockFounders = [{ founderId: 1, founderName: 'Founder A', title: 'CEO' }];
      founderModel.getAllFoundersByCompanyId.mockImplementation((id, callback) => {
        callback(null, mockFounders);
      });

      const mockRequest = { params: { id: companyId } };
      founderHandlers.getAllFoundersByCompanyId(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockFounders);
    });

    it('should handle internal server error', () => {
      const companyId = '123';
      const mockError = new Error('Test error');
      founderModel.getAllFoundersByCompanyId.mockImplementation((id, callback) => {
        callback(mockError, null);
      });

      const mockRequest = { params: { id: companyId } };
      founderHandlers.getAllFoundersByCompanyId(mockRequest, mockResponse);

      expect(utils.handleInternalServerError).toHaveBeenCalledWith(mockError, mockResponse);
    });
  });

  describe('addFounderToCompany', () => {
    it('should respond with founder ID on successful addition', () => {
      const companyId = '123';
      const mockFounderData = { founderName: 'New Founder', title: 'CTO' };
      const mockInsertedId = 456;
      founderModel.addFounderToCompany.mockImplementation((id, name, title, callback) => {
        callback(null, { insertId: mockInsertedId });
      });

      const mockRequest = { params: { id: companyId }, body: mockFounderData };
      founderHandlers.addFounderToCompany(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({ founderId: mockInsertedId });
    });

    it('should handle duplicate founder error', () => {
      const companyId = '123';
      const mockFounderData = { founderName: 'Duplicate Founder', title: 'CFO' };
      const mockError = { duplicateFounder: true };
      founderModel.addFounderToCompany.mockImplementation((id, name, title, callback) => {
        callback(mockError, null);
      });

      const mockRequest = { params: { id: companyId }, body: mockFounderData };
      founderHandlers.addFounderToCompany(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Founder with the same name already exists for another company' });
    });

    it('should handle internal server error', () => {
      const companyId = '123';
      const mockFounderData = { founderName: 'New Founder', title: 'CFO' };
      const mockError = new Error('Test error');
      founderModel.addFounderToCompany.mockImplementation((id, name, title, callback) => {
        callback(mockError, null);
      });

      const mockRequest = { params: { id: companyId }, body: mockFounderData };
      founderHandlers.addFounderToCompany(mockRequest, mockResponse);

      expect(utils.handleInternalServerError).toHaveBeenCalledWith(mockError, mockResponse);
    });
  });
});
