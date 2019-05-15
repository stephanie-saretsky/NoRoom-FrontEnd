import React, { Component } from "react";
import { Link } from "react-router-dom";

class CafeInfo extends Component {
  render() {
    let { info } = this.props;

    return (
      <div>
        <h1>
          {info.name} | <Link to={"cafe/" + info._id}>Check Room</Link>
        </h1>
        <p>{info.desc}</p>
      </div>
    );
  }
}

export default CafeInfo;
