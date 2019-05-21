import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
import "../css/search.css";
import "../css/cafes.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CafeCard from "./CafeCard.jsx";
let path = "http://localhost:4000/";

class UnconnectedHomepage extends Component {
  constructor() {
    super();
    this.state = {
      cafes: [],
      searchInput: ""
    };
  }

  componentDidMount = () => {
    console.log("cafe list rendering");
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
          let featured = body.cafeList.slice(8, 11);
          this.props.dispatch({ type: "cafe-results", cafes: featured });
        }
      });
  };

  handleChange = event => {
    console.log(event.target.value);
    let newInput = event.target.value;
    this.setState({ searchInput: newInput });
  };

  handleSubmit = event => {
    console.log(this.state.searchInput, "search input");
    event.preventDefault();
    this.props.dispatch({
      type: "search-input",
      search: this.state.searchInput
    });
    this.props.history.push("/cafes");
  };

  render = () => {
    return (
      <div>
        <div style={{ height: "60vh" }}>
          <div className="hero-image">
            <div className="logo-container">
              <img className="logo-main" src={"/logo.png"} height="150px" />
            </div>
            <form className="search" onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="searchTerm"
                value={this.state.searchInput}
                onChange={this.handleChange}
                placeholder="Search cafes..."
              />
              <input className="submit-search-home" type="submit" value=" " />
            </form>
          </div>
        </div>
        <ul className="list-container">
          {this.props.cafes.map(cafe => (
            <CafeCard cafe={cafe} />
          ))}
        </ul>
        <div className="linkBack">
          <Link className="button seeMore" to={"/cafes"}>
            SEE ALL CAFÉS
          </Link>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { homeSearch: state.search, cafes: state.cafes };
};

let Homepage = connect(mapStateToProps)(withRouter(UnconnectedHomepage));

export default Homepage;
