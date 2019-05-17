import "../css/navbar.css";
import "../css/main.css";
import Search from "./Search.jsx";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class NavBar extends Component {
  render = () => {
    let searchEnabled = undefined;
    if (this.props.searchEnabled) {
      searchEnabled = <Search />;
    }
    return (
      <div className="bar">
        <Link to={"/"}>
          <img src="/logo.png" height="80px" />
        </Link>
        {searchEnabled}
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
