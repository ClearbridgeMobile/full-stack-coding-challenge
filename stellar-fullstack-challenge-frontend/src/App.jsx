import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
 import "./App.css";
import CompaniesView from "./pages/companies-view/CompaniesView";
import CreateOrEditCompany from "./pages/create-company/CreateOrEditCompany";
import CompanyView from "./pages/company-view/CompanyView";
import { companiesService } from "./services/CompaniesService";

function App() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setCompanies(companiesService.getAllCompanies(setCompanies));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<CompaniesView companies={companies} />} />
        <Route
          path="/create-edit-company"
          element={<CreateOrEditCompany setCompanies={setCompanies} />}
        />
        <Route
          path="/company-view/:companyId"
          element={<CompanyView setCompanies={setCompanies} />}
        />
        <Route path="*" element={<h1>Page not found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
