import axios from 'axios';
import { companiesService } from '../src/services/CompaniesService';


jest.mock('axios');

describe('CompaniesService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockResponseData = [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
  ];

  test('getAllCompanies', async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const setterMock = jest.fn();
    await companiesService.getAllCompanies(setterMock);

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/companies`);
    expect(setterMock).toHaveBeenCalledWith(mockResponseData);
  });

  test('getCompany', async () => {
    const companyId = 1;
    const mockCompany = { id: companyId, name: 'Company A' };

    axios.get.mockResolvedValueOnce({ data: [mockCompany] });

    const setterMock = jest.fn();
    await companiesService.getCompany(companyId, setterMock);

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/companies/${companyId}`);
    expect(setterMock).toHaveBeenCalledWith(mockCompany);
  });

  test('addCompany', async () => {
    const postData = { name: 'New Company' };
    const mockResponseData = { id: 3, ...postData };

    axios.post.mockResolvedValueOnce({ data: mockResponseData });

    const response = await companiesService.addCompany(postData);

    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/companies`, postData);
    expect(response).toEqual(mockResponseData);
  });

  test('updateCompany', async () => {
    const postData = { id: 1, name: 'Updated Company' };
    const mockResponseData = { ...postData };

    axios.put.mockResolvedValueOnce({ data: [mockResponseData] });

    const response = await companiesService.updateCompany(postData);

    expect(axios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/companies`, postData);
    expect(response).toEqual(mockResponseData);
  });

  test('deleteCompany', async () => {
    const companyId = 1;

    axios.delete.mockResolvedValueOnce({ data: { id: companyId } });

    const response = await companiesService.deleteCompany(companyId);

    expect(axios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/companies/${companyId}`);
    expect(response).toEqual({ id: companyId });
  });
});
