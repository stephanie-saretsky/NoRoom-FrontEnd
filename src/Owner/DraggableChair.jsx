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
        src="https://png.pngtree.com/element_pic/17/03/25/ae19648580be439490d2e3562c8b4f2a.jpg"
        height="100px"
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
