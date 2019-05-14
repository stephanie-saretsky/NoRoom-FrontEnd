import React, { Component } from "react";

class ClickableTable extends Component {
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
    let image = "/table.png";
    if (this.state.taken) {
      image = "/table.png";
    }
    return (
      <img
        src={image}
        height="60px"
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

export default ClickableTable;
