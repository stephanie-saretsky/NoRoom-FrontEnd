import React, { Component } from "react";
import Popup from "./Owner-Popup.jsx";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
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
      </div>
    );
  };
}

export default Footer;
