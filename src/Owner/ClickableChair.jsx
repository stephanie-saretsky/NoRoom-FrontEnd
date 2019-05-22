import React, { Component } from "react";
import swal from "sweetalert2";
import { connect } from "react-redux";
import "../../css/chairs.css";
let path = "http://localhost:4000/";

class UnconnectedClickableChair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taken: "",
      time: ""
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
                swal.fire({
                  title: "Your café is full!",
                  text: "What is the approximate wait time?",
                  input: "text",
                  type: "question",
                  confirmButtonColor: "#ba5a31",
                  inputPlaceholder: "Example: 15 minutes, 1 hour ...",
                  customClass: {
                    container: "prompt-container",
                    confirmButton: "swal-button"
                  },
                  inputValidator: value => {
                    if (!value) {
                      return "Nothing";
                    }
                    let data = new FormData();
                    let waitTime = value;
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
let mapStateToProps = st => {
  return {
    time: st.time
  };
};

let ClickableChair = connect(mapStateToProps)(UnconnectedClickableChair);

export default ClickableChair;
