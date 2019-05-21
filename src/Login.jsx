import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/login-signup.css";
import swal from "sweetalert2";
import { withRouter } from "react-router-dom";
let path = "http://localhost:4000/";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let username = this.state.username;
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch(path + "login", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (!parsed.success) {
          swal.fire({
            title: "Oops!",
            type: "error",
            text: "Invalid username or password",
            confirmButtonText: "Try again",
            confirmButtonColor: "#ba5a31",
            customClass: {
              container: "login-container",
              confirmButton: "swal-login-button"
            }
          });
          return;
        }
        this.props.dispatch({
          type: "login-success",
          username: username
        });
        this.props.closePopup();
        this.props.history.push("/");
      });
    this.setState({ username: "", password: "" });
  };

  render = () => {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input
          className="login-input"
          type="text"
          onChange={this.handleUsername}
          value={this.state.username}
          placeholder="Username"
          required
        />
        <input
          className="login-input"
          type="password"
          onChange={this.handlePassword}
          value={this.state.password}
          placeholder="Password"
          required
        />
        <input className="login-button" type="submit" value="Log In" />
      </form>
    );
  };
}

let Login = connect()(withRouter(UnconnectedLogin));

export default Login;
