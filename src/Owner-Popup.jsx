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
    if (this.state.login) {
      signUpLogin = <Login closePopup={this.props.closePopup} />;
      buttonText = "Sign Up Here";
    } else {
      signUpLogin = <Signup closePopup={this.props.closePopup} />;
      buttonText = "Log In Here";
    }
    return (
      <div className="popup">
        <div className="popup_inner">
          {signUpLogin}
          <button onClick={this.signUp}>{buttonText}</button>
          <div className="close-button">
            <button onClick={this.props.closePopup}>Close Me</button>
          </div>
        </div>
      </div>
    );
  };
}

export default Popup;
