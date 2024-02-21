import CompanyList from './components/CompanyList';
import { Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import AddCompany from './components/AddCompany';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<CompanyList/>} />
        <Route path="/add-company" element={<AddCompany />} />    
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
