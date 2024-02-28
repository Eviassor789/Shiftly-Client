import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import Generate from './Generate/Generate';
import WeekShifts from './ShiftsPage/WeekShifts/WeekShifts';
import ShiftsPage from './ShiftsPage/ShiftsPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/table" element={<WeekShifts />} />
        <Route path="/page" element={<ShiftsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
