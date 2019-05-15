import React, { Component } from "react";

class Chair extends Component {
  constructor(props) {
    super();
    this.state = {
      out: ""
    };
  }

  mouseDown = evt => {
    this.props.click(this.props.index, evt, "chair", this.props.id);
  };

  render = () => {
    let src = "/chair.png";
    if (this.props.out) {
      src = "/chair-delete.png";
    }
    return (
      <img
        src={src}
        height="50px"
        draggable={false}
        style={{
          position: "absolute",
          left: this.props.x + "px",
          top: this.props.y + "px",
          zIndex: 20
        }}
        onMouseDown={this.mouseDown}
      />
    );
  };
}

export default Chair;
