import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // for expect(...).toBeInTheDocument()
import { BrowserRouter } from "react-router-dom";
import CompanyView from "../src/pages/company-view/CompanyView";

describe("CompanyView component", () => {
  const mockCompany = {
    companyName: "Mock Company",
    foundedDate: "2022-01-01",
    city: "Mock City",
    state: "Mock State",
    description: "Mock Description",
  };

  const mockFounders = [
    {
      firstName: "John",
      lastName: "Doe",
      title: "CEO",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      title: "CTO",
    },
  ];

  const mockSetCompanies = jest.fn();

  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <CompanyView setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );
  });

  test("displays company details when company data is provided", () => {
    render(
      <BrowserRouter>
        <CompanyView setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    // Mock useEffect fetching company data
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCompany),
      })
    );

    expect(screen.getByText(mockCompany.companyName)).toBeInTheDocument();
    expect(screen.getByText(/January 1, 2022/i)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCompany.city}, ${mockCompany.state}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockCompany.description)).toBeInTheDocument();
  });

  test('displays "No companies to display!" when no company data is provided', () => {
    render(
      <BrowserRouter>
        <CompanyView setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    expect(screen.getByText("No companies to display!")).toBeInTheDocument();
  });

  test('navigates to home when "Home" button is clicked', () => {
    render(
      <BrowserRouter>
        <CompanyView setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Home"));

    expect(window.location.pathname).toBe("/");
  });

  test('navigates to create-edit-company when "Edit" button is clicked', () => {
    render(
      <BrowserRouter>
        <CompanyView setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Edit Company"));

    expect(window.location.pathname).toBe("/create-edit-company");
  });

  test('calls setCompanies and navigates to home when "Delete" button is clicked', async () => {
    render(
      <BrowserRouter>
        <CompanyView setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    // Mock useEffect fetching company data
    await jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCompany),
      })
    );

    fireEvent.click(screen.getByText("Delete"));

    // Check if setCompanies is called
    await expect(mockSetCompanies).toHaveBeenCalled();

    // Check if navigation is correct
    expect(window.location.pathname).toBe("/");
  });

  test("displays founder details", async () => {
    render(
      <BrowserRouter>
        <CompanyView setCompanies={mockSetCompanies} />
      </BrowserRouter>
    );

    // Mock useEffect fetching company and founders data
    await jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockCompany) })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockFounders) })
      );

    // Check if founder details are displayed
    mockFounders.forEach((founder) => {
      expect(
        screen.getByText(
          `${founder.firstName} ${founder.lastName}, ${founder.title}`
        )
      ).toBeInTheDocument();
    });
  });
});
