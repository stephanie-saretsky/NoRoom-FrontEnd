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
      tables: [],
      height: 0,
      width: 0
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    let cafeId = this.props.cafeId;
    let data = new FormData();
    data.append("cafeId", cafeId);
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
          this.props.dispatch({
            type: "cafe-results",
            cafes: [parsed.cafe]
          });
        }
      });
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
          }
        });
    };
    this.intervalId = setInterval(updater, 500);
  };

  componentDidUpdate = () => {
    clearInterval(this.intervalId);
  };

  render = () => {
    let cafe = this.state.cafe;
    let chairs = this.state.chairs;
    let tables = this.state.tables;
    let seatsAvailable = chairs.length;
    let seatDiv = (
      <div className="p-container">
        <p className="room-p">
          There are <span className="red">{seatsAvailable + " seats "}</span>
          available.
        </p>
        <p className="room-p">Come visit!</p>
      </div>
    );
    chairs.map(chair => {
      if (chair.taken) {
        seatsAvailable--;
        seatDiv = (
          <div className="p-container">
            <p className="room-p">
              There are{" "}
              <span className="red">{seatsAvailable + " seats "}</span>
              available.
            </p>
            <p className="room-p">Come visit!</p>
          </div>
        );
        if (seatsAvailable === 1) {
          seatDiv = (
            <div className="p-container">
              <p className="room-p">
                There is <span className="red">1 seat</span> available.
              </p>
              <p className="room-p">Come visit!</p>
            </div>
          );
        }
        if (seatsAvailable === 0) {
          seatDiv = (
            <div className="p-container">
              <p className="room-p">
                There is currently <span className="red">no room</span> at{" "}
                {" " + cafe.name + "."}
              </p>
              <p className="room-p">
                {"Come by in " + cafe.waitTime + " to get a seat!"}
              </p>
            </div>
          );
        }
      }
    });
    if (this.state.cafe._id)
      return (
        <div>
          <div className="section">
            <div className="main-details">
              <div className="section-wrapper">
                <div className="section-content details-text">
                  <h1 className="room-title">
                    {"Is there room at " + cafe.name + "?"}
                  </h1>
                  {seatDiv}
                </div>
              </div>
            </div>

            <div className="main-details">
              <div className="section-wrapper">
                <div className="section-content details">
                  {chairs.map(chair => {
                    if (chair.taken) {
                      return (
                        <img
                          height={(50 / 730) * 100 + "%"}
                          src="/chair-taken.png"
                          style={{
                            position: "absolute",
                            left: (chair.x / 1000) * 100 + "%",
                            top: (chair.y / 730) * 100 + "%",
                            zIndex: 10
                          }}
                        />
                      );
                    }
                    if (!chair.taken) {
                      return (
                        <img
                          height={(50 / 730) * 100 + "%"}
                          src="/chair.png"
                          style={{
                            position: "absolute",
                            left: (chair.x / 1000) * 100 + "%",
                            top: (chair.y / 730) * 100 + "%",
                            zIndex: 10
                          }}
                        />
                      );
                    }
                  })}
                  {tables.map(table => {
                    return (
                      <img
                        height={(60 / 730) * 100 + "%"}
                        src="/table.png"
                        style={{
                          position: "absolute",
                          left: (table.x / 1000) * 100 + "%",
                          top: (table.y / 730) * 100 + "%",
                          zIndex: 10
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="main-details">
              <div className="section-wrapper">
                <div className="section-content details-map">
                  <Map />
                </div>
              </div>
            </div>
          </div>
          <div className="main-details">
            <div className="section-wrapper">
              <div className="section-content details-contact">
                <h2 className="contact-title">{"Contact " + cafe.name}</h2>
                <p className="contact-p">{cafe.address}</p>
                <p className="contact-p">{cafe.city + " " + cafe.code}</p>
                <p className="contact-p">{cafe.number}</p>
                <p>
                  <a href={cafe.url}>Website</a>
                </p>
                <Link
                  to={{
                    pathname: "/reviews/" + cafe._id.toString(),
                    state: {
                      name: cafe.name
                    }
                  }}
                >
                  Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    else return <div />;
  };
}

let CafeDetails = connect()(UnconnectedCafeDetails);

export default CafeDetails;
