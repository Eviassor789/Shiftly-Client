import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import Generate from './Generate/Generate';
import WeekShifts from './ShiftsPage/WeekShifts/WeekShifts';
import ShiftsPage from './ShiftsPage/ShiftsPage';
import ShiftWindow from './ShiftsPage/WeekShifts/ShiftWindow/ShiftWindow';
import Modal from './ShiftsPage/WeekShifts/Modal/modal';


function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [currentTableID, setCurrentTableID] = useState("");


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          }
        />
        <Route path="/register" element={<Register loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>} />
        <Route path="/home" element={<Home currentTableID={currentTableID} setCurrentTableID={setCurrentTableID} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>} />
        <Route path="/generate" element={<Generate loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>} />
        <Route path="/table" element={<WeekShifts loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>} />
        <Route path="/page" element={<ShiftsPage currentTableID={currentTableID} setCurrentTableID={setCurrentTableID} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>} />
        <Route path="/modal" element={<Modal />} />
        <Route
          path="/win"
          element={
            <ShiftWindow
              day="Monday"
              startTime="09:00"
              endTime="17:00"
              requiredWorkers={8}
              occupiedWorkers={["Alice", "Bob"]}
              unoccupiedWorkers={["Charlie", "David"]}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
