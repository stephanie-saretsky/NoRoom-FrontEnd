import React, { Component } from "react";
import "../css/main.css";
import "../css/cafes.css";
import CafeCard from "./CafeCard.jsx";
import { connect } from "react-redux";

class UnconnectedCafesNearby extends Component {
  render = () => {
    return (
      <ul className="list-container">
        {this.props.cafes.map(cafe => (
          <CafeCard cafe={cafe} />
        ))}
      </ul>
    );
  };
}

let mapStateToProps = state => {
  return { cafes: state.cafes };
};

let CafesNearby = connect(mapStateToProps)(UnconnectedCafesNearby);

export default CafesNearby;
