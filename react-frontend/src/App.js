import CompanyList from './components/CompanyList';
import { Route, Routes } from 'react-router-dom';
import CompanyDetails from './components/CompanyDetails';
import Error from './components/Error';
import AddOrUpdateCompany from './components/AddOrUpdateCompany';
import AddFounder from './components/AddFounder';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<CompanyList/>} />
        <Route path="/company-details/:id" element={<CompanyDetails />} />
        <Route path="/add-update-company" element={<AddOrUpdateCompany />} />    
        <Route path="/add-update-company/:id" element={<AddOrUpdateCompany />} />        
        <Route path="/add-founder/:id" element={<AddFounder />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
