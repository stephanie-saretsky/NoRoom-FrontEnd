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
      <div className="form-container">
        <form className="add-review-container" onSubmit={this.handleSubmit}>
          <div className="reviewer-rating-name">
            <input
              type="text"
              className="reviewer-input"
              onChange={this.handleChangeName}
              value={this.state.name}
              placeholder="Your Name"
              required
            />

            <div className="rate-cafe">
              <span className="rating">
                <input
                  type="radio"
                  name="review"
                  value="5"
                  id="rating5"
                  checked={this.state.ratingInput === "5"}
                  onChange={this.handleRadioChange}
                />
                <label for="rating5" />

                <input
                  type="radio"
                  name="review"
                  value="4"
                  id="rating4"
                  checked={this.state.ratingInput === "4"}
                  onChange={this.handleRadioChange}
                />
                <label for="rating4" />

                <input
                  type="radio"
                  name="review"
                  value="3"
                  id="rating3"
                  checked={this.state.ratingInput === "3"}
                  onChange={this.handleRadioChange}
                />
                <label for="rating3" />

                <input
                  type="radio"
                  name="review"
                  value="2"
                  id="rating2"
                  checked={this.state.ratingInput === "2"}
                  onChange={this.handleRadioChange}
                />
                <label for="rating2" />

                <input
                  type="radio"
                  name="review"
                  value="1"
                  id="rating1"
                  checked={this.state.ratingInput === "1"}
                  onChange={this.handleRadioChange}
                />
                <label for="rating1" />
              </span>
            </div>
          </div>
          <div>
            <textarea
              className="text-add review-add"
              name="textarea"
              value={this.state.review}
              placeholder="Share your experience at this café"
              onChange={this.handleChangeReview}
              required
            />
          </div>
          <div className="add-review-button-container">
            <div className="add-button-container">
              <input
                className="add-item-button button small-button"
                type="submit"
                value="Post Review"
              />
            </div>
            <button
              className="button small-button"
              onClick={this.props.changePopup}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  };
}

let Addreview = connect()(withRouter(UnconnectedAddreview));
export default Addreview;
