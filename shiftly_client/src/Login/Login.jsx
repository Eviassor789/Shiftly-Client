import "./Login.css";
import React from 'react';

function Login() {
  return (
    <>
      <div id="Login_upper_background"></div>
      <div id="Login_container">
        <p id="Login_headline">
          Login to <span className="blue">shiftly</span>
        </p>
        <div className="input">
          <p className="blue">Username</p>
          <input id="login_username_input"></input>
        </div>
        <div className="input">
          <p className="blue">Password</p>
          <input id="login_password_input" type="password"></input>
        </div>
        <div id="wrap_center">
          <button id="Login_Button" type="button" class="btn btn-primary">
            Next <i class="bi bi-arrow-right"></i>
          </button>

          <div
            class="MuiDivider-root MuiDivider-fullWidth MuiDivider-withChildren mui-style-rtl-1onl4dq"
            role="separator"
          >
            <span class="MuiDivider-wrapper mui-style-rtl-c1ovea">or</span>
          </div>

          <div id="social_net_container">
            <div>
              <button class="btn">
                <svg
                  enable-background="new 0 0 48 48"
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

            {/* <div>
              <button class="btn">
                <svg
                  fill="none"
                  height="48"
                  viewBox="0 0 24 24"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m23 12c0-6.07578-4.9242-11-11-11-6.07578 0-11 4.92422-11 11 0 5.4914 4.02187 10.0418 9.2812 10.8668v-7.6871h-2.79292v-3.1797h2.79292v-2.42344c0-2.75644 1.6415-4.27968 4.1551-4.27968 1.2032 0 2.4621.21484 2.4621.21484v2.70703h-1.3879c-1.3664 0-1.7917.84863-1.7917 1.71875v2.0625h3.0507l-.4877 3.1797h-2.563v7.6871c5.2593-.825 9.2812-5.3754 9.2812-10.8668z"
                    fill="#1877f2"
                  />
                  <path
                    d="m16.2818 15.1797.4877-3.1797h-3.0507v-2.0625c0-.87012.4253-1.71875 1.7917-1.71875h1.3879v-2.70703s-1.2589-.21484-2.4621-.21484c-2.5136 0-4.1551 1.52324-4.1551 4.27968v2.42344h-2.79292v3.1797h2.79292v7.6871c.5608.0881 1.1344.1332 1.7188.1332s1.158-.0451 1.7188-.1332v-7.6871z"
                    fill="#fff"
                  />
                </svg>
                <span> continue with Facbook</span>
              </button>
            </div> */}
          </div>

          <div>
            <p>
              New To Shiftly? <span className="blue">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;