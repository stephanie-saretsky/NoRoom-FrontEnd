import React, { Component } from "react";
import "../css/details.css";
import Map from "./Map.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
let path = "http://localhost:4000/";

class UnconnectedCafeDetails extends Component {
  constructor() {
    super();
    this.state = {
      cafe: { _id: 0 },
      reviews: [],
      chairs: [],
      tables: []
    };
  }

  componentDidMount = () => {
    let cafeId = this.props.cafeId;
    let data = new FormData();
    data.append("cafeId", cafeId);
    let updater = () => {
      fetch(path + "cafe-details", {
        method: "POST",
        body: data,
        credentials: "include"
      })
        .then(header => {
          return header.text();
        })
        .then(body => {
          let parsed = JSON.parse(body);
          if (parsed.success) {
            this.setState({
              cafe: parsed.cafe,
              reviews: parsed.reviews,
              chairs: parsed.cafe.chairs,
              tables: parsed.cafe.tables
            });
            this.props.dispatch({
              type: "cafe-results",
              cafes: [parsed.cafe]
            });
          }
        });
    };
    this.interval = setInterval(updater, 500);
  };

  render = () => {
    let cafe = this.state.cafe;
    let chairs = this.state.chairs;
    let tables = this.state.tables;
    let seatsAvailable = chairs.length;
    let seatDiv = "";
    return (
      <div>
        <div className="details-layout">
          {chairs.map(chair => {
            if (chair.taken) {
              seatsAvailable--;
              seatDiv = (
                <p>
                  {"There are " + seatsAvailable + " seats available, come by!"}
                </p>
              );
              if (seatsAvailable === 1) {
                seatDiv = (
                  <p>
                    {"There is " + seatsAvailable + " seat available, come by!"}
                  </p>
                );
              }
              if (seatsAvailable === 0) {
                seatDiv = (
                  <p>
                    {"There is currently no room at " +
                      cafe.name +
                      ". Try coming by in " +
                      cafe.waitTime +
                      "!"}
                  </p>
                );
              }
              return (
                <img
                  height="50px"
                  src="/chair-taken.png"
                  style={{
                    position: "absolute",
                    left: chair.x + "px",
                    top: chair.y + "px",
                    zIndex: 10
                  }}
                />
              );
            }
            if (!chair.taken) {
              return (
                <img
                  height="50px"
                  src="/chair.png"
                  style={{
                    position: "absolute",
                    left: chair.x + "px",
                    top: chair.y + "px",
                    zIndex: 10
                  }}
                />
              );
            }
          })}
          {tables.map(table => {
            return (
              <img
                height="60px"
                src="/table.png"
                style={{
                  position: "absolute",
                  left: table.x + "px",
                  top: table.y + "px",
                  zIndex: 10
                }}
              />
            );
          })}
        </div>
        <div className="room-text">
          <h1>{"Is there room at " + cafe.name + "?"}</h1>
          {seatDiv}
        </div>
        <Map />
      </div>
    );
  };
}

let CafeDetails = connect()(UnconnectedCafeDetails);

export default CafeDetails;
