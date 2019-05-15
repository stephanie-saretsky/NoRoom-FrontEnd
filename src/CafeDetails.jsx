import React, { Component } from "react";
import "../css/details.css";
import Map from "./Map.jsx";
import { Link } from "react-router-dom";

class CafeDetails extends Component {
  render = () => {
    return (
      <div>
        {/* layout image */}
        <h1>Is there room?</h1>
        if (seatcount = 0)
        <p>There is no room. Try coming by in 15 minutes</p>
        <p>There is x seats left. Come on by!</p>
        {this.props.cafe.name}
        <Map />
      </div>
    );
  };
}

export default CafeDetails;
