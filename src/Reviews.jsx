import React, { Component } from "react";
import Addreview from "./addReview.jsx";
import { connect } from "react-redux";
import Addresponse from "./Addresponse.jsx";
import { withRouter } from "react-router-dom";
import EditResponse from "./EditResponse.jsx";
import "../css/reviews.css";
let path = "http://localhost:4000/";

class unconnectedReviews extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      response: false,
      reviewId: "",
      editResponse: false
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

  renderForm = (x, y) => {
    if (!y && this.props.loggedIn) {
      return (
        <button
          onClick={() => {
            this.setState({ response: true, reviewId: x });
          }}
        >
          Reply
        </button>
      );
    } else if (y && this.props.loggedIn) {
      return (
        <button
          onClick={() => {
            this.setState({
              reviewId: x,
              editResponse: true
            });
          }}
        >
          Edit
        </button>
      );
    }
  };

  renderClose = () => {
    this.setState({ response: false });
  };

  renderCloseEdit = () => {
    this.setState({ editResponse: false });
  };

  renderResponse = () => {
    if (this.state.response) {
      return (
        <div>
          <Addresponse
            reviewId={this.state.reviewId}
            renderReviews={this.takeReviews}
          />
          <button onClick={this.renderClose}>close</button>
        </div>
      );
    } else if (!this.props.loggedIn) {
      return (
        <Addreview
          cafeId={this.props.cafeId}
          renderReviews={this.takeReviews}
        />
      );
    } else if (this.state.editResponse) {
      return (
        <div>
          {this.renderEdit(this.state.reviewId, this.takeReviews)}
          <button onClick={this.renderCloseEdit}>close</button>
        </div>
      );
    }
  };

  renderEdit = (x, y) => {
    return <EditResponse reviewId={x} renderReviews={y} />;
  };

  renderReviewsResponses = () => {
    return this.state.reviews.map(review => {
      return (
        <li className="review" key={"review" + review._id.toString()}>
          <div>
            <h4>{review.reviewerName + " :"}</h4>
            <span>{this.renderRating(review)}</span> <p>{review.review}</p>
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
            {review.response.length > 0 ? (
              <div>
                {this.renderForm(
                  review._id.toString(),
                  review.response[0].edit
                )}
              </div>
            ) : (
              <div>{this.renderForm(review._id.toString(), false)}</div>
            )}
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="review-container">
        <div
          className="splash-header"
          style={{
            backgroundImage: "url('/cafe.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        >
          <div className="text-splash">
            <h1 className="cafe-title">{this.props.name + " Reviews"}</h1>
            <span className="average-rating">
              {this.renderRatingTwo(this.renderAverage())}
            </span>
          </div>
        </div>
        <ul>{this.renderReviewsResponses()}</ul>
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
