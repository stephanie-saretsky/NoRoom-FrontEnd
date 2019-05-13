import React, { Component } from "react";
import { connect } from "react-redux";
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
          alert("Invalid Username or Password");
          return;
        }
        this.props.dispatch({ type: "login-success" });
        this.props.closePopup();
      });
    this.setState({ username: "", password: "" });
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Username: </p>
        <input
          type="text"
          onChange={this.handleUsername}
          value={this.state.username}
        />
        <p>Password: </p>
        <input
          type="password"
          onChange={this.handlePassword}
          value={this.state.password}
        />
        <input type="submit" value="Log In" />
      </form>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
