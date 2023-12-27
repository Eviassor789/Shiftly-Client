import './Login.css' 


function Login() {
  return (
    <>
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
          <input id="login_password_input"></input>
        </div>
        <button id="Login_Button"  type="button" class="btn btn-primary">
          Next <i class="bi bi-arrow-right"></i>
        </button>

        <div id="icons">google facebook</div>
        <div>
          <p>
            New To Shiftly? <span className="blue">Sign Up</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;