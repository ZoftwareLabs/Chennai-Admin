import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import Issues from './pages/Issues';
import Dashboard from './pages/Dashboard';
import EleDash from './pages/EleDash';
import WaterDash from './pages/WaterDash';
import RoadDash from './pages/RoadDash';
import GarbageDash from './pages/GarbageDash';

import EleIssues from './pages/EleIssues';
import GarabgeIssues from './pages/GarabgeIssues';
import RoadIssues from './pages/RoadIssues';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      // console.log(userToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashBoard" element={<Dashboard />} />
          <Route path="/eleDash" element={<EleDash />} />
          <Route path="/waterDash" element={<WaterDash />} />
          <Route path="/roadDash" element={<RoadDash />} />
          <Route path="/garbageDash" element={<GarbageDash />} />
          {/* I S S U E S */}
          <Route path="/elecrtical-Issues" element={<EleIssues />} />
          <Route path="/garbage-Issues" element={<GarabgeIssues />} />
          <Route path="/road-Issues" element={<RoadIssues />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
