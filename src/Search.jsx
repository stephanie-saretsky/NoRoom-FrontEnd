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
        console.log("Response", parsedResponse);
        if (parsedResponse.success) {
          console.log("array of search", parsedResponse.cafes);
          this.props.dispatch({
            type: "cafe-results",
            cafes: parsedResponse.cafes
          });
          console.log(this.props.cafes, "cafe list");
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
      </form>
    );
  };
}

let Search = connect()(UnconnectedSearch);

export default Search;
