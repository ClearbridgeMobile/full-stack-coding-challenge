import CompanyList from './components/CompanyList';
import { Route, Routes } from 'react-router-dom';
import Error from './components/Error';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<CompanyList/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
