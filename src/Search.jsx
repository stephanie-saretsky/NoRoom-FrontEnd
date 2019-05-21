import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/navbar.css";
let path = "http://localhost:4000/";

class UnconnectedSearch extends Component {
  constructor() {
    super();
    this.state = {
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
    let search = this.state.searchInput;
    fetch(path + "search-cafe?search=" + search)
      .then(response => response.text())
      .then(response => {
        let parsedResponse = JSON.parse(response);
        if (parsedResponse.success) {
          this.props.dispatch({
            type: "cafe-results",
            cafes: parsedResponse.cafes
          });
        }
      })
      .catch(err => console.log(err));
    this.setState({ searchInput: "" });
  };

  render = () => {
    return (
      <form className="search-list" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="searchTermList"
          value={this.state.searchInput}
          onChange={this.handleChange}
          placeholder="Search cafes"
        />
        <input className="submit-search" type="submit" value=" " />
      </form>
    );
  };
}

let Search = connect()(UnconnectedSearch);

export default Search;
