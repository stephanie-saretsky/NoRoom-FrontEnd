import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
import "../css/search.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedHomepage extends Component {
  constructor() {
    super();
    this.state = {
      cafes: [],
      searchInput: ""
    };
  }

  handleChange = event => {
    console.log(event.target.value);
    let newInput = event.target.value;
    this.setState({ searchInput: newInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "search-input",
      action: this.state.searchInput
    });
    this.props.history.push("/cafes");
  };

  render = () => {
    return (
      <div style={{ height: "80vh" }}>
        <div className="hero-image">
          <h1>Is There Room At Your Fave Cafe?</h1>
          <form className="search" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="searchTerm"
              value={this.state.searchInput}
              onChange={this.handleChange}
              placeholder="Search cafes"
            />
          </form>
        </div>
        <p>Featured Cafes</p>
        {/* render 3 cafes */}
        <Link to={"/cafes"}>See more</Link>
      </div>
    );
  };
}
//nav bar

// splash image

//search bar

// see more button

let Homepage = connect()(withRouter(UnconnectedHomepage));

export default Homepage;
