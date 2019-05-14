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
          <h1 className="home-head">Is There Room At Your Fave Café?</h1>
          <form className="search" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="searchTerm"
              value={this.state.searchInput}
              onChange={this.handleChange}
              placeholder="Search cafés..."
            />
          </form>
        </div>
        <p>Featured Cafés</p>
        {/* render 3 cafes */}
        <Link to={"/cafes"}>See more</Link>
      </div>
    );
  };
}

let Homepage = connect()(withRouter(UnconnectedHomepage));

export default Homepage;
