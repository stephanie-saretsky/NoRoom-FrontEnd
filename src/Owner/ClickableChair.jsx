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
    let image =
      "https://png.pngtree.com/element_pic/17/03/25/ae19648580be439490d2e3562c8b4f2a.jpg";
    if (this.state.taken) {
      image = "https://i.stack.imgur.com/Q4nm0.png";
    }
    return (
      <img
        src={image}
        height="100px"
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
