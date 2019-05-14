import React, { Component } from "react";

class ClickableChair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taken: false
    };
  }

  changeSeat = () => {
    this.setState({ taken: !this.state.taken });
  };

  render = () => {
    let image = "/chair.png";
    if (this.state.taken) {
      image = "/chair-taken.png";
    }
    return (
      <img
        src={image}
        height="50px"
        onClick={this.changeSeat}
        style={{
          position: "absolute",
          left: this.props.x + "px",
          top: this.props.y + "px",
          zIndex: 10
        }}
      />
    );
  };
}

export default ClickableChair;