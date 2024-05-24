import "./Register.css";
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    // You can add additional logic or conditions here if needed
    // For now, just navigate to the specified page
    navigate(`/${page}`);
  };

  return (
    <>
      <div id="Register_upper_background"></div>
      <div id="Register_container">
        <p id="Register_headline">Create a new account</p>
        <div className="input">
          <p className="blue">Username</p>
          <input id="Register_username_input"></input>
        </div>
        <div className="input">
          <p className="blue">Password</p>
          <input id="Register_password_input" type="password"></input>
        </div>
        <div className="input">
          <p className="blue">Verify password</p>
          <input id="Register_verify_input" type="password"></input>
        </div>
        <div id="wrap_center">
          <button
            id="Register_Button"
            type="button"
            class="btn btn-primary"
            onClick={() => handleButtonClick("")}
          >
            Next <i class="bi bi-arrow-right"></i>
          </button>

          <div>
            <p>
              Already have an account?{" "}
              <span
                className="blue pointer"
                onClick={() => handleButtonClick("")}
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
