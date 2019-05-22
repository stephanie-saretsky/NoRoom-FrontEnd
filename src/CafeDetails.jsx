import React, { Component } from "react";
import "../css/details.css";
import "../css/main.css";
import Map from "./Map.jsx";
import ReviewsPopup from "./Reviews-Popup.jsx";
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
      width: 0,
      showPopup: false
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

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  // componentDidUpdate = () => {
  //   clearInterval(this.intervalId);
  // };

  render = () => {
    let cafe = this.state.cafe;
    let chairs = this.state.chairs;
    let tables = this.state.tables;
    let seatsAvailable = chairs.length;
    let popup = "";
    let seatDiv = (
      <div className="p-container">
        <p className="room-p">
          There are <span className="red">{seatsAvailable + " seats "}</span>
          available.
        </p>
        <p className="room-p">Come visit!</p>
      </div>
    );
    if (this.state.showPopup) {
      popup = (
        <ReviewsPopup
          cafeId={cafe._id.toString()}
          name={cafe.name}
          image={cafe.images[0]}
          closePopup={this.togglePopup}
        />
      );
    }
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
                {"Come by in "} <span className="red">{cafe.waitTime}</span>
                {" to get a seat!"}
              </p>
              <Link className="nearby" to={"/search-nearby/" + cafe._id}>
                FIND NEARBY CAFÉS
              </Link>
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
                <div
                  className="section-content details-text"
                  style={{
                    backgroundImage: "url('" + cafe.images[0] + "')",
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                  }}
                >
                  <div className="text-wrapper">
                    <h1 className="room-title">
                      {"Is there room at " + cafe.name + "?"}
                    </h1>
                    {seatDiv}
                  </div>
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
            <div className="main-details">
              <div className="section-wrapper">
                <div className="section-content details-contact">
                  <h2 className="contact-title">{"Contact " + cafe.name}</h2>
                  <p className="contact-p">{cafe.address}</p>
                  <p className="contact-p">{cafe.city + " " + cafe.code}</p>
                  <p>
                    <a className="contact-link" href={"tel:+1" + cafe.number}>
                      {cafe.number}
                    </a>
                  </p>
                  <p>
                    <a className="contact-link" href={cafe.url} target="_blank">
                      Website
                    </a>
                  </p>
                  <button
                    className="button reviews-button"
                    onClick={this.togglePopup}
                  >
                    Reviews
                  </button>
                  {popup}
                  {/* <Link
                    className="contact-link"
                    to={{
                      pathname: "/reviews/" + cafe._id.toString(),
                      state: {
                        name: cafe.name,
                        reviews: this.state.reviews,
                        image: cafe.images[0]
                      }
                    }}
                  >
                    Reviews
                  </Link> */}
                </div>
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
