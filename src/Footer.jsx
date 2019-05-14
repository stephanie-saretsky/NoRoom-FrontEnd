import React, { Component } from "react";
import Popup from "./Owner-Popup.jsx";
import { connect } from "react-redux";
let path = "http://localhost:4000/";

class UnconnectedFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  logout = () => {
    fetch(path + "logout", {
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          this.props.dispatch({ type: "logout-success" });
        }
      });
  };

  render = () => {
    let popup = "";
    if (this.state.showPopup) {
      popup = <Popup closePopup={this.togglePopup} />;
    }
    return (
      <div>
        <button onClick={this.togglePopup}>Cafe Owner</button>
        {popup}
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  };
}

let Footer = connect()(UnconnectedFooter);

export default Footer;
