import React, { Component } from "react";
import Addreview from "./addReview.jsx";
let path = "http://localhost:4000/";

class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      reviews: []
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

  render() {
    console.log("state =>", this.state);
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h2>Reviews</h2>
        <span>{this.renderRatingTwo(this.renderAverage())}</span>
        <ul>
          {this.state.reviews.map(review => {
            return (
              <li>
                <div>
                  <h4>{review.reviewerName + " :"}</h4>
                  <span>{this.renderRating(review)}</span>{" "}
                  <p>{review.review}</p>
                </div>
                <div>
                  {review.response.length > 0 ? (
                    <div>
                      <h4>
                        Response from the owner
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
        <Addreview
          cafeId={this.props.cafeId}
          renderReviews={this.takeReviews}
        />
      </div>
    );
  }
}

export default Reviews;
