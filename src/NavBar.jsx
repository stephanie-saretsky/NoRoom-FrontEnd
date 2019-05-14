import "../css/navbar.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class NavBar extends Component {
  render = () => {
    return (
      <div className="bar">
        <Link to={"/"}>
          <img src="/logo.png" height="80px" />
        </Link>
        <div className="cafes">
          <Link to={"/cafes"}>All Cafes</Link>
        </div>
      </div>
    );
  };
}

export default NavBar;
