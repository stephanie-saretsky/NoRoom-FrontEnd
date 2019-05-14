import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super();
    this.state = {
      copied: false
    };
  }
  mouseDown = evt => {
    this.props.click(this.props.index, evt, "table", this.state.copied);
    this.setState({ copied: true });
  };

  render = () => {
    return (
      <img
        src="/table.png"
        height="60x"
        draggable={false}
        onMouseUp={this.mouseUp}
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

export default Table;
