import React from 'react';
import CommoditiesTable from './components/CommoditiesTable'
import SingleCommodityTable from './components/SingleCommodityTable'
import UsersTable from './components/UsersTable';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import Footer from './components/Footer';
import userToken from './components/userToken'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import Ticker from './components/Ticker'
import About from './components/About'

import './output.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const { token, removeToken, setToken, user_id, setUserID } = userToken();

  
  return (
    <main className="bg-slate-200 flex flex-col min-h-screen justify-between">
      
      <Router>

        <header>
          <Nav removeToken={removeToken} token={token} user_id={user_id}/>
          <Ticker />
        </header>

        <div className="flex justify-center">

          <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route path="/about" element={<About />} />
              
              <Route path="/commodities" element={<CommoditiesTable />} />

              <Route path="/commodities/:symbol" element={<SingleCommodityTable token={token} user_id={user_id}/>} />

              <Route path="/users" element={<UsersTable />} />

              <Route path="/user/:user_id" element={token ? <CommoditiesTable /> : <Login setToken={setToken} />} />

              <Route path="/profile" element={token ? <Profile /> : <Login setToken={setToken} />} />

              <Route path="/login" element={<Login setToken={setToken} setUserID={setUserID}/>} />

              <Route path="/register" element={<Register />} />

          </Routes>

        </div>

        <Footer/>

      </Router>
      
    </main>
  );
}

export default App;
