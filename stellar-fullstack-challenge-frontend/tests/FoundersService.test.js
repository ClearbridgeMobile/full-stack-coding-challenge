import axios from 'axios';
import { foundersService } from '../src/services/FoundersService';


jest.mock('axios');

describe('foundersService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockResponseData = [
    { id: 1, name: 'Founder A' },
    { id: 2, name: 'Founder B' },
  ];

  test('getFounders', async () => {
    const companyId = 1;

    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const setterMock = jest.fn();
    await foundersService.getFounders(companyId, setterMock);

    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/founders/founder/${companyId}`);
    expect(setterMock).toHaveBeenCalledWith(mockResponseData);
  });

  test('addFounders', async () => {
    const postData = { name: 'New Founder' };
    const mockResponseData = { id: 3, ...postData };

    axios.post.mockResolvedValueOnce({ status: 200, data: mockResponseData });

    const setterMock = jest.fn();
    await foundersService.addFounders(postData, setterMock);

    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/founders`, postData);
    expect(setterMock).toHaveBeenCalledWith(mockResponseData);
  });

  test('validateFounder', async () => {
    const postData = { name: 'New Founder' };

    axios.post.mockResolvedValueOnce({ data: { present: 'YES' } });

    const response = await foundersService.validateFounder(postData);

    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_URL}/founders/validate`, postData);
    expect(response).toBe(false);
  });
});
