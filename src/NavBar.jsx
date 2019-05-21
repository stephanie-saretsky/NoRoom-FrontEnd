import "../css/navbar.css";
import "../css/main.css";
import Search from "./Search.jsx";
import { Link, withRouter } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
let path = "http://localhost:4000/";

class UnconnectedNavBar extends Component {
  allCafes = () => {
    fetch(path + "cafes", {
      method: "GET"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log(body, "JSON BODY");
        if (body.success) {
          this.props.dispatch({ type: "cafe-results", cafes: body.cafeList });
        }
      });
    this.props.history.push("/cafes");
  };

  render = () => {
    let searchEnabled = undefined;
    if (this.props.searchEnabled) {
      searchEnabled = <Search />;
    }
    return (
      <div className="bar">
        <Link className="nav-logo" to={"/"}>
          <img className="logo" src="/nav-logo3.png" />
        </Link>
        {searchEnabled}
        <div className="cafes">
          <button onClick={this.allCafes} className="button allCafes">
            All Cafes
          </button>
        </div>
      </div>
    );
  };
}

let NavBar = connect()(withRouter(UnconnectedNavBar));

export default NavBar;
