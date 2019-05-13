import React, { Component } from "react";
import "./css/search.css";
import "./css/main.css";
import { Link } from "react-router-dom";
import Map from "./Map.jsx";
let path = "http://demo5595251.mockable.io/";

class CafeList extends Component {
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
        if (body.success) {
          this.setState({ cafes: body.cafeList });
        }
      });
  };

  handleChange = event => {
    console.log(event.target.value);
    let newInput = event.target.value;
    this.setState({ searchInput: newInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    let search = this.state.searchInput;
    fetch(path + "search?search=" + search) // https://maps.googleapis.com/maps/api/geocode/json?search=search&key=AIzaSyCWyXDRjjUoo8QrnGjIZAwNj3t3QivVGhs
      .then(response => response.text())
      .then(response => {
        let parsedResponse = JSON.parse(response);
        console.log("Response", parsedResponse);
        if (parsedResponse.success) {
          console.log("array of search", parsedResponse);
          this.setState({ cafes: parsedResponse });
        }
      })
      .catch(err => console.log(err));
    this.setState({ searchInput: "" });
  };

  renderMap = () => {
    return <Map />;
  };

  render = () => {
    return (
      <div>
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
        <button onClick={this.renderMap}>
          <img src="/public/map.png" height="100" width="100" />
        </button>
        <ul className="cafe-list-container">
          {this.state.cafes.map(cafe => {
            return (
              <div className="cafe-card">
                <Link to={"cafe/" + cafe._id}>{cafe.name}</Link>
              </div>
            );
          })}
        </ul>
      </div>
    );
  };
}

export default CafeList;
