import React from 'react';
// import SearchBar from './components/SearchBar'
import CommoditiesTable from './components/CommoditiesTable'
import SingleCommodityTable from './components/singleCommodityTable'
import UsersTable from './components/UsersTable';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import Footer from './components/Footer';
import userToken from './components/userToken'
import Login from './components/Login'
import Profile from './components/Profile'
import Logout from './components/Logout'

import './output.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const { token, removeToken, setToken } = userToken();

  return (
    <main className="flex flex-col min-h-screen justify-between bg-white">
      
      <Router>

        <Nav removeToken={removeToken} token={token} />

        <div className="flex justify-center">

          <Routes>

              <Route path="/" element={<Dashboard />} />
              
              <Route path="/commodities" element={<CommoditiesTable />} />

              <Route path="/commodities/:symbol" element={<SingleCommodityTable />} />

              <Route path="/users" element={<UsersTable />} />

              <Route path="/user/:user_id" element={token ? <CommoditiesTable /> : <Login setToken={setToken} />} />

              {/* if logged in with token, show profile page */}
              <Route path="/profile" element={token ? <Profile /> : <Login setToken={setToken} />} />

              <Route path="/login" element={<Login setToken={setToken} />} />

          </Routes>

        </div>

        <Footer/>

      </Router>
      
    </main>
  );
}

export default App;
