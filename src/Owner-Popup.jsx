import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "../css/popup.css";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  signUp = () => {
    this.setState({ login: !this.state.login });
  };

  render = () => {
    let signUpLogin = "";
    let buttonText = "";
    let welcomeText = "";
    if (this.state.login) {
      signUpLogin = <Login closePopup={this.props.closePopup} />;
      buttonText = "Sign up here";
      welcomeText = <p>Don't have an account?</p>;
    } else {
      signUpLogin = <Signup closePopup={this.props.closePopup} />;
      buttonText = "Log in here";
      welcomeText = <p>Already registered?</p>;
    }
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="form-container">
            {signUpLogin}
            <div className="welcome">
              {welcomeText}
              <button className="welcome-button" onClick={this.signUp}>
                {buttonText}
              </button>
            </div>
          </div>
          <div className="close-button">
            <img
              src="/close.png"
              height="10px"
              onClick={this.props.closePopup}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default Popup;
