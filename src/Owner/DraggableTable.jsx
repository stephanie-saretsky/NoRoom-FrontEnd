import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super();
  }

  mouseDown = evt => {
    this.props.click(this.props.index, evt, "table", this.props.id);
  };

  render = () => {
    let src = "/table.png";
    if (this.props.out) {
      src = "/table-delete.png";
    }
    return (
      <img
        src={src}
        height="60x"
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

export default Table;
