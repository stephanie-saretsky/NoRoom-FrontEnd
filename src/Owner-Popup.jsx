import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./popup.css";

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
    if (this.state.login) {
      signUpLogin = <Login />;
    } else {
      signUpLogin = <Signup />;
    }
    return (
      <div className="popup">
        <div className="popup_inner">
          {signUpLogin}
          <button onClick={this.signUp}>SignUp/LogIn</button>
          <button onClick={this.props.closePopup}>Close Me</button>
        </div>
      </div>
    );
  };
}

export default Popup;
