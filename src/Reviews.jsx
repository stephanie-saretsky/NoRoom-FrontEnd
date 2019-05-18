import React, { Component } from "react";
import Addreview from "./addReview.jsx";
import { connect } from "react-redux";
import Addresponse from "./Addresponse.jsx";
let path = "http://localhost:4000/";

class unconnectedReviews extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      response: false,
      reviewId: ""
    };
  }

  renderRatingTwo = x => {
    let stars = [];
    for (let i = 0; i < x; i++) {
      stars = stars.concat("✿");
    }
    for (let j = 0; j < 5 - x; j++) {
      stars = stars.concat("❀");
    }
    return stars;
  };

  renderAverage = () => {
    let reviews = this.state.reviews;
    let total = 0;
    let div = reviews.length;
    let average = 0;
    reviews.map(elem => {
      let number = Number(elem.rating);
      total += number;
    });
    average = Math.round(total / div);
    return average;
  };

  takeReviews = () => {
    let data = new FormData();
    data.append("cafeId", this.props.cafeId);
    fetch(path + "reviews", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        console.log(responseBody);
        let parsed = JSON.parse(responseBody);
        this.setState({ reviews: parsed.reviews });
      });
  };

  componentDidMount = () => {
    this.takeReviews();
  };

  renderRating = props => {
    let stars = [];
    for (let i = 0; i < props.rating; i++) {
      stars = stars.concat("✿");
    }
    for (let j = 0; j < 5 - props.rating; j++) {
      stars = stars.concat("❀");
    }
    return stars;
  };

  renderForm = x => {
    if (this.props.loggedIn) {
      return (
        <button
          onClick={() => {
            this.setState({ response: true, reviewId: x });
          }}
        >
          Response
        </button>
      );
    }
  };

  renderResponse = () => {
    if (this.state.response) {
      return (
        <Addresponse
          reviewId={this.state.reviewId}
          renderReviews={this.takeReviews}
        />
      );
    } else if (!this.props.loggedIn) {
      return (
        <Addreview
          cafeId={this.props.cafeId}
          renderReviews={this.takeReviews}
        />
      );
    }
  };

  render() {
    console.log("state =>", this.state);
    return (
      <div>
        <h1>{this.props.name}</h1>
        <span>{this.renderRatingTwo(this.renderAverage())}</span>
        <h2>Reviews</h2>
        <ul>
          {this.state.reviews.map(review => {
            return (
              <li>
                <div>
                  <h4>{review.reviewerName + " :"}</h4>
                  <span>{this.renderRating(review)}</span>{" "}
                  <p>{review.review}</p>
                  {this.renderForm(review._id.toString())}
                </div>
                <div>
                  {review.response.length > 0 ? (
                    <div>
                      <h4>
                        Response:
                        {" " + review.response[0].ownerName + " :"}
                      </h4>
                      <p>{review.response[0].response}</p>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
        {this.renderResponse()}
      </div>
    );
  }
}

let mapStateToProps = st => {
  return { loggedIn: st.loggedIn };
};

let Reviews = connect(mapStateToProps)(unconnectedReviews);

export default Reviews;
