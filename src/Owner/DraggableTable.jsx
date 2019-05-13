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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Ski_trail_rating_symbol-blue_square.svg/600px-Ski_trail_rating_symbol-blue_square.svg.png"
        height="100px"
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
