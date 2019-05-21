import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert2";
import { withRouter } from "react-router-dom";
let path = "http://localhost:4000/";

class UnconnectedAddreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      ratingInput: "5",
      cafeId: "",
      name: ""
    };
  }

  componentDidMount = () => {
    console.log("props=>", this.props);
    this.setState({ cafeId: this.props.cafeId });
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeReview = event => {
    this.setState({ review: event.target.value });
  };

  handleRadioChange = e => {
    let ratingInput = e.target.value;
    this.setState({ ratingInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("review", this.state.review);
    data.append("cafeId", this.state.cafeId);
    data.append("rating", this.state.ratingInput);
    data.append("name", this.state.name);
    fetch(path + "add-review", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          swal.fire({
            title: "Thanks for your review",
            type: "success",
            confirmButtonColor: "#ba5a31"
          });
          this.setState({ review: "", name: "", cafeId: "" }, () => {
            this.props.renderReviews();
          });
          // this.props.history.push("/");
          // return;
        }
      });
  };

  render = () => {
    return (
      <div className="add-review">
        <div className="add-review-container">
          <div>
            <h3>{this.props.name}</h3>
            <form onSubmit={this.handleSubmit}>
              <div>
                <p>Your name:</p>
                <input
                  type="text"
                  onChange={this.handleChangeName}
                  value={this.state.name}
                  required
                />
              </div>
              <div className="rate-cafe">
                <p>Rating:</p>
                <section>
                  <label>
                    <input
                      type="radio"
                      name="review"
                      value="1"
                      checked={this.state.ratingInput === "1"}
                      onChange={this.handleRadioChange}
                    />
                    1
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="review"
                      value="2"
                      checked={this.state.ratingInput === "2"}
                      onChange={this.handleRadioChange}
                    />
                    2
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="review"
                      value="3"
                      checked={this.state.ratingInput === "3"}
                      onChange={this.handleRadioChange}
                    />
                    3
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="review"
                      value="4"
                      checked={this.state.ratingInput === "4"}
                      onChange={this.handleRadioChange}
                    />
                    4
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="review"
                      value="5"
                      checked={this.state.ratingInput === "5"}
                      onChange={this.handleRadioChange}
                    />
                    5
                  </label>
                </section>
              </div>
              <div>
                <p>Review: </p>
                <textarea
                  className="text-add"
                  rows="5"
                  cols="30"
                  name="textarea"
                  value={this.state.review}
                  onChange={this.handleChangeReview}
                  required
                />
              </div>

              <div className="add-button-container">
                <input className="add-item-button" type="submit" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

let Addreview = connect()(withRouter(UnconnectedAddreview));
export default Addreview;
