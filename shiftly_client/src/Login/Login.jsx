import "./Login.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from "../Data/Users";
import User from "../User";

function Login(props) {

  const navigate = useNavigate();
  localStorage.setItem('jwtToken', "");

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = (page) => {
    navigate(`/${page}`);
  };

  // const handleLogin = () => {
  //   if (users.get(username) && users.get(username).password == password) {
  //     props.setLoggedUser(username);
  //     navigate("/home");
  //   } else {
  //     setErrorMessage("Invalid username or password");
  //   }
  // };

  async function handleLogin() {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        const { access_token } = data;

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('jwtToken', access_token);
        localStorage.setItem('loggedUser', username);

        console.log('Login successful');
        navigate("/home");

    } catch (error) {
        console.error('Error:', error);
        setErrorMessage("Invalid username or password");
    }
}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setErrorMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !errorMessage && username && password) {
      handleLogin(event); // Call handleLogin on Enter key press
    }
  };

  return (
    <>
      <div id="Login_upper_background"></div>
      <div id="Login_container">
        <p id="Login_headline">
          Login to <span className="blue">shiftly</span>
        </p>
        <div className="input">
          <p className="blue">Username</p>
          <input
            id="login_username_input"
            value={username}
            onChange={handleInputChange(setUsername)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="input">
          <p className="blue">Password</p>
          <div className="password-container">
            <input
              id="login_password_input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleInputChange(setPassword)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <>
                  <svg
                    aria-labelledby="eyeCrossedIconTitle"
                    color="#000000"
                    fill="none"
                    height="35px"
                    stroke="#000000"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    width="35px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title id="eyeCrossedIconTitle" />
                    <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M3 21L20 4" />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    aria-labelledby="eyeIconTitle"
                    color="#000000"
                    fill="none"
                    height="35px"
                    stroke="#000000"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    width="35px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title id="eyeIconTitle" />
                    <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div id="wrap_center">
          <button
            id="Login_Button"
            type="button"
            className="btn btn-primary"
            disabled={!username || !password}
            onClick={handleLogin}
          >
            Next <i className="bi bi-arrow-right"></i>
          </button>

          <div
            className="MuiDivider-root MuiDivider-fullWidth MuiDivider-withChildren mui-style-rtl-1onl4dq"
            role="separator"
          >
            <span className="MuiDivider-wrapper mui-style-rtl-c1ovea">or</span>
          </div>

          <div id="social_net_container">
            <div>
              <button className="btn">
                <svg
                  enableBackground="new 0 0 48 48"
                  height="30"
                  viewBox="0 0 48 48"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    fill="#ffc107"
                  />
                  <path
                    d="m6.306 14.691 6.571 4.819c1.778-4.402 6.084-7.51 11.123-7.51 3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-7.682 0-14.344 4.337-17.694 10.691z"
                    fill="#ff3d00"
                  />
                  <path
                    d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.521-4.504 2.43-7.219 2.43-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025c3.31 6.477 10.032 10.921 17.805 10.921z"
                    fill="#4caf50"
                  />
                  <path
                    d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238c-.438.398 6.591-4.807 6.591-14.807 0-1.341-.138-2.65-.389-3.917z"
                    fill="#1976d2"
                  />
                </svg>
                <span> continue with Google</span>
              </button>
            </div>
          </div>

          <div>
            <p>
              New To Shiftly?{" "}
              <span
                className="blue pointer"
                onClick={() => handleButtonClick("register")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
