import React, { Component } from "react";
let path = "http://localhost:4000/";

class ClickableChair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taken: ""
    };
  }

  componentDidMount = () => {
    this.setState({ taken: this.props.taken });
  };

  changeSeat = () => {
    let chairId = this.props.id;
    let data = new FormData();
    let amountTaken = 0;
    data.append("chairId", chairId);
    data.append("cafeId", this.props.cafeId);
    fetch(path + "change-seat", {
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
          this.setState({ taken: !this.state.taken });
          return fetch(path + "cafe-owner-details", {
            method: "POST",
            credentials: "include"
          })
            .then(header => {
              return header.text();
            })
            .then(body => {
              let parsed = JSON.parse(body);
              let cafe = parsed[0];
              let chairs = cafe.chairs;
              let amountOfChairs = chairs.length;
              chairs.forEach(chair => {
                if (chair.taken === true) {
                  amountTaken++;
                }
              });
              if (amountTaken === amountOfChairs) {
                let waitTime = window.prompt(
                  "Your cafe is full! What is the approximate wait time?"
                );
                let data = new FormData();
                data.append("waitTime", waitTime);
                fetch(path + "wait-time", {
                  method: "POST",
                  body: data,
                  credentials: "include"
                });
              }
            });
        }
      });
  };

  render = () => {
    let image = "/chair.png";
    if (this.state.taken) {
      image = "/chair-taken.png";
    }
    return (
      <img
        src={image}
        height="50px"
        onClick={this.changeSeat}
        style={{
          position: "absolute",
          left: this.props.x + "px",
          top: this.props.y + "px",
          zIndex: 10
        }}
      />
    );
  };
}

export default ClickableChair;
