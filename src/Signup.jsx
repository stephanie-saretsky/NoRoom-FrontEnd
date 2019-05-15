import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/login-signup.css";
let path = "http://localhost:4000/";

class UnconnectedSignup extends Component {
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
    fetch(path + "signup", {
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
          alert("Username already exists!");
          return;
        }
        return fetch(path + "login", {
          method: "POST",
          body: data,
          credentials: "include"
        })
          .then(x => {
            return x.text();
          })
          .then(responseBody => {
            let body = JSON.parse(responseBody);
            if (!body.success) {
              alert("login failed");
              return;
            }
            this.props.dispatch({
              type: "login-success",
              username: username
            });
            this.props.closePopup();
          });
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
          placeholder="Choose a username"
        />

        <input
          className="login-input"
          type="password"
          onChange={this.handlePassword}
          value={this.state.password}
          placeholder="Choose a password"
        />
        <input className="login-button" type="submit" value="Sign Up" />
      </form>
    );
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
