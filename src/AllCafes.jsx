import React, { Component } from "react";
import "../css/main.css";
import "../css/cafes.css";
import Map from "./Map.jsx";
import { connect } from "react-redux";
import CafeCard from "./CafeCard.jsx";

let path = "http://localhost:4000/";

class UnconnectedAllCafes extends Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
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
            this.props.dispatch({ type: "cafe-results", cafes: body.cafeList });
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
            this.props.dispatch({
              type: "cafe-results",
              cafes: parsedResponse.cafes
            });
            this.props.dispatch({
              type: "search-input",
              search: ""
            });
          }
        });
    }
  };

  render = () => {
    return (
      <div>
        <div style={{ height: "55vh", width: "screen.width * 0.9" }}>
          <Map />
        </div>
        <ul className="list-container">
          {this.props.cafes.map(cafe => (
            <CafeCard cafe={cafe} />
          ))}
        </ul>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { homeSearch: state.search, cafes: state.cafes };
};

let AllCafes = connect(mapStateToProps)(UnconnectedAllCafes);
export default AllCafes;
