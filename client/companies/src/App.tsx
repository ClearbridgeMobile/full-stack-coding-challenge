import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompaniesIndex from './components/CompaniesIndex/CompaniesIndex';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import CreateCompany from './components/CreateCompany/CreateCompany';
import EditCompany from './components/EditCompany/EditCompany';
import AddFounder from './components/AddFounder/AddFounder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CompaniesIndex />} />
        <Route path='/company/:id' element={<CompanyDetails />} />
        <Route path='/create-company' element={<CreateCompany />} />
        <Route path='/edit-company' element={<EditCompany />} />
        <Route path='/add-founder' element={<AddFounder />} />
      </Routes>
    </Router>
  );
}

export default App;
