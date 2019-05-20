import React, { Component } from "react";
import Popup from "./Owner-Popup.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/footer.css";
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
        this.props.history.push("/");
        return;
      });
  };

  render = () => {
    let popup = "";
    if (this.state.showPopup) {
      popup = <Popup closePopup={this.togglePopup} />;
    }
    let ownerButton = (
      <button className="owner-button" onClick={this.togglePopup}>
        Café Owner
      </button>
    );

    if (this.props.login) {
      ownerButton = (
        <button className="owner-button" onClick={this.logout}>
          Log Out
        </button>
      );
    }
    return (
      <div className="footer">
        <div>
          <img className="social" src="/facebook.png" height="30px" />
          <img className="social" src="/insta.png" height="30px" />
          <img className="social" src="/twitter.png" height="30px" />
        </div>
        <img src="/nav-logo3.png" height="30px" />
        {ownerButton}
        {popup}
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    login: st.loggedIn
  };
};

let Footer = connect(mapStateToProps)(withRouter(UnconnectedFooter));

export default Footer;
