import "../css/navbar.css";
import "../css/main.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class NavBar extends Component {
  render = () => {
    return (
      <div className="bar">
        <Link to={"/"}>
          <img src="/logo.png" height="80px" />
        </Link>
        <h2 className="home-head">Is There Room At Your Fave Café?</h2>
        <div className="cafes">
          <Link className="button allCafes" to={"/cafes"}>
            All Cafes
          </Link>
        </div>
      </div>
    );
  };
}

export default NavBar;
