import React from 'react';
// import SearchBar from './components/SearchBar'
import CommoditiesTable from './components/CommoditiesTable'
import SingleCommodityTable from './components/singleCommodityTable'
import UsersTable from './components/UsersTable';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import './output.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <main>

      

      <Router>

        <Nav/>

        <Routes>

          <Route path="/" element={<Dashboard />} />
          
          <Route path="/prices" element={<CommoditiesTable />} />

          <Route path="/prices/:symbol" element={<SingleCommodityTable />} />

          <Route path="/users" element={<UsersTable />} />

        </Routes>

      </Router>
      
    </main>
  );
}

export default App;
