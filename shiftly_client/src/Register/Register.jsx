import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../Data/Users';
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleVerifyPasswordVisibility = () => {
    setShowVerifyPassword(!showVerifyPassword);
  };

  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    // You can add additional logic or conditions here if needed
    // For now, just navigate to the specified page
    navigate(`/${page}`);
  };

  const handleRegisteration = () => {
    users += {username: username, password: password, tablesArr: []};
    console.log("users: " + users)
    handleButtonClick("");
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVerifyPasswordChange = (event) => {
    setVerifyPassword(event.target.value);
  };

  const usernameLengthValid = username.length >= 8;
  const passwordsMatch = password === verifyPassword;
  const passwordLengthValid = password.length >= 8;

  return (
    <>
      <div id="Register_upper_background"></div>
      <div id="Register_container">
        <p id="Register_headline">Create a new account</p>
        <div className="input">
          <p className="blue">Username</p>
          <input
            id="Register_username_input"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div className="input">
          <p className="blue">Password</p>
          <div className="password-container">
            <input
              id="Register_password_input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
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
              ) : (
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
              )}
            </button>
          </div>
        </div>
        <div className="input">
          <p className="blue">Verify password</p>
          <div className="password-container">
            <input
              id="Register_verify_input"
              type={showVerifyPassword ? "text" : "password"}
              value={verifyPassword}
              onChange={handleVerifyPasswordChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleVerifyPasswordVisibility}
            >
              {showVerifyPassword ? (
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
                  {/* Your SVG icon for hiding password */}
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
          <div id="password_note">
            Username and Password must be at least 8 characters long
          </div>
        </div>
        <div id="wrap_center">
          <button
            id="Register_Button"
            type="button"
            className={`btn btn-primary ${
              passwordsMatch && passwordLengthValid && usernameLengthValid
                ? ""
                : "disabled"
            }`}
            onClick={() => handleButtonClick("")}
            disabled={
              !passwordsMatch || !passwordLengthValid || !usernameLengthValid
            }
          >
            Next <i className="bi bi-arrow-right"></i>
          </button>
          <div>
            <p>
              Already have an account?{" "}
              <span
                className="blue pointer"
                onClick={() => handleRegisteration()}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;