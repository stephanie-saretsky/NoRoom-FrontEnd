import React, { Component } from "react";
import "../css/main.css";
import "../css/cafes.css";
import { Link } from "react-router-dom";
import Map from "./Map.jsx";
import { connect } from "react-redux";
let path = "http://localhost:4000/";

class UnconnectedAllCafes extends Component {
  constructor() {
    super();
    this.state = {
      cafes: [],
      searchInput: "",
      mapView: false
    };
  }

  componentDidMount = () => {
    console.log("cafe list rendering");
    if (this.props.homeSearch === "") {
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
            this.setState({ cafes: body.cafeList });
          }
        });
    } else {
      console.log(this.props.homeSearch, "search value");
      fetch(path + "search-cafe?search=" + this.props.homeSearch, {
        method: "GET"
      })
        .then(response => response.text())
        .then(response => {
          let parsedResponse = JSON.parse(response);
          console.log("JSON RESPONSE", parsedResponse);
          if (parsedResponse.success) {
            console.log("array of search", parsedResponse.cafes);
            this.setState({ cafes: parsedResponse.cafes });
          }
        });
    }
  };

  handleChange = event => {
    console.log(event.target.value);
    let newInput = event.target.value;
    this.setState({ searchInput: newInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    let search = this.state.searchInput;
    fetch(path + "search-cafe?search=" + search) // https://maps.googleapis.com/maps/api/geocode/json?search=search&key=AIzaSyCWyXDRjjUoo8QrnGjIZAwNj3t3QivVGhs
      .then(response => response.text())
      .then(response => {
        let parsedResponse = JSON.parse(response);
        console.log("Response", parsedResponse);
        if (parsedResponse.success) {
          console.log("array of search", parsedResponse.cafes);
          this.setState({ cafes: parsedResponse.cafes });
          console.log(this.state.cafes, "cafe list");
        }
      })
      .catch(err => console.log(err));
    this.setState({ searchInput: "" });
  };

  renderMap = () => {
    if (this.state.mapView) {
      return <Map />;
    }
  };

  handleState = () => {
    this.setState({ mapView: true });
  };

  render = () => {
    return (
      <div>
        <h1>All Cafés</h1>
        <form className="search-list" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="searchTermList"
            value={this.state.searchInput}
            onChange={this.handleChange}
            placeholder="Search cafes"
          />
        </form>
        <button onClick={this.handleState}>
          <img src="/map.png" height="60" />
        </button>
        {this.renderMap()}
        <ul className="list-container">
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

let mapStateToProps = state => {
  return { homeSearch: state.search };
};

let AllCafes = connect(mapStateToProps)(UnconnectedAllCafes);
export default AllCafes;
