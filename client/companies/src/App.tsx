// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompaniesIndex from './components/CompaniesIndex/CompaniesIndex';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import CreateCompany from './components/CreateCompany/CreateCompany';
import EditCompany from './components/EditCompany/EditCompany';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CompaniesIndex />} />
        <Route path='/company/:id' element={<CompanyDetails />} />
        <Route path='/create-company' element={<CreateCompany />} />
        <Route path='/edit-company' element={<EditCompany />} />
      </Routes>
    </Router>
  );
}

export default App;