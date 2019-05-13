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
    let image =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Ski_trail_rating_symbol-blue_square.svg/600px-Ski_trail_rating_symbol-blue_square.svg.png";
    if (this.state.taken) {
      image =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/220px-Square_-_black_simple.svg.png";
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

export default ClickableTable;
