import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login/Login';
import Register from './Register/Register'
import Home from './Home/Home';
import Generate from './Generate/Generate';
import reportWebVitals from './reportWebVitals';
import SchedulingTile from './Home/HistoryBox/SchedulingTile/SchedulingTile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Login /> */}
    {/*<Register />*/}
    {/* <Home /> */}
    <Generate />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
