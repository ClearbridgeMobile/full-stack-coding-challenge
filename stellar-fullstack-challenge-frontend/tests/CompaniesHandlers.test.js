import { companiesService } from "../src/services/CompaniesService";
import { companiesHandlers } from "../src/utils/CompaniesHandlers";

jest.mock("../src/services/CompaniesService");
jest.mock("../src/utils/CompaniesHandlers");

describe("companiesHandlers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("handleSaveCompany", async () => {
    const setCompaniesMock = jest.fn();
    const navigateMock = jest.fn();

    const mockEvent = {
      target: {
        companyName: { value: "Test Company" },
        state: { value: "Test State" },
        city: { value: "Test City" },
        foundedDate: { value: "2022-01-01" },
        description: { value: "Test Description" },
      },
    };

    const mockNewCompany = { id: 1, name: "Test Company" };


    await companiesHandlers.handleSaveCompany(
      mockEvent,
      setCompaniesMock,
      navigateMock
    );


    expect(setCompaniesMock).toHaveBeenCalledWith(mockNewCompany);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  test("handleUpdateCompany", async () => {
    const setValueMock = jest.fn();
    const navigateMock = jest.fn();

    const mockEvent = {
      target: {
        companyName: { value: "Updated Test Company" },
        state: { value: "Updated Test State" },
        city: { value: "Updated Test City" },
        foundedDate: { value: "2022-02-01" },
        description: { value: "Updated Test Description" },
      },
    };

    const companyId = 1;
    const mockUpdatedCompany = { id: companyId, name: "Updated Test Company" };


    await companiesHandlers.handleUpdateCompany(
      mockEvent,
      setValueMock,
      navigateMock,
      companyId
    );

    expect(companiesService.handleUpdateCompany).toHaveBeenCalledWith({
      companyName: "Updated Test Company",
      state: "Updated Test State",
      city: "Updated Test City",
      foundedDate: "2022-02-01",
      description: "Updated Test Description",
      companyId: companyId,
    });

    expect(setValueMock).toHaveBeenCalledWith(mockUpdatedCompany);
    expect(navigateMock).toHaveBeenCalledWith(`/company-view/${companyId}`);
  });
});
