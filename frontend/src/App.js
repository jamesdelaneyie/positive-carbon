import React from 'react';
// import SearchBar from './components/SearchBar'
import CommoditiesTable from './components/CommoditiesTable'
import SingleCommodityTable from './components/singleCommodityTable'
import UsersTable from './components/UsersTable';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './output.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <main className="flex flex-col min-h-screen justify-between bg-white">

      <Router>

        <Nav/>

        <Routes>

          <Route path="/" element={<Dashboard />} />
          
          <Route path="/commodities" element={<CommoditiesTable />} />

          <Route path="/commodities/:symbol" element={<SingleCommodityTable />} />

          <Route path="/users" element={<UsersTable />} />

          <Route path="/user/:user_id" element={<CommoditiesTable />} />

        </Routes>

        <Footer/>

      </Router>
      
    </main>
  );
}

export default App;
