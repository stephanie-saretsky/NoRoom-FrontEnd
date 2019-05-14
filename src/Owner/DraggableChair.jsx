import React, { Component } from "react";

class Chair extends Component {
  constructor(props) {
    super();
    this.state = {
      copied: false
    };
  }
  mouseDown = evt => {
    this.props.click(this.props.index, evt, "chair", this.state.copied);
    this.setState({ copied: true });
  };

  render = () => {
    return (
      <img
        src="/chair.png"
        height="50px"
        draggable={false}
        style={{
          position: "absolute",
          left: this.props.x + "px",
          top: this.props.y + "px",
          zIndex: 10
        }}
        onMouseDown={this.mouseDown}
      />
    );
  };
}

export default Chair;
