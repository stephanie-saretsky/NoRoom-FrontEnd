import React, { Component } from "react";
import Addreview from "./addReview.jsx";
import { connect } from "react-redux";
import Addresponse from "./Addresponse.jsx";
import { withRouter } from "react-router-dom";
import EditResponse from "./EditResponse.jsx";
import "../css/reviews.css";
let path = "http://localhost:4000/";

class unconnectedReviewsPopup extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      response: false,
      reviewId: "",
      editResponse: false,
      addReview: false
    };
  }

  renderRatingTwo = x => {
    let stars = [];
    for (let i = 0; i < x; i++) {
      stars = stars.concat(<img src="/stars.png" height="25px" />);
    }
    for (let j = 0; j < 5 - x; j++) {
      stars = stars.concat(<img src="/stars2.png" height="25px" />);
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
      stars = stars.concat(<img src="/stars.png" height="15px" />);
    }
    for (let j = 0; j < 5 - props.rating; j++) {
      stars = stars.concat(<img src="/stars2.png" height="15px" />);
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
    return (
      <div className="add-review-container">
        <Addreview
          cafeId={this.props.cafeId}
          renderReviews={this.takeReviews}
          changePopup={this.changePopup}
        />
      </div>
    );
  };

  renderEdit = (x, y) => {
    return <EditResponse reviewId={x} renderReviews={y} />;
  };

  renderReviewsResponses = () => {
    return this.state.reviews.map(review => {
      return (
        <li className="review" key={"review" + review._id.toString()}>
          <div>
            <div className="review-name-rating">
              <h4 className="reviewer">{review.reviewerName}</h4>
              <span>{this.renderRating(review)}</span>
            </div>
            <p className="review-p">{review.review}</p>
          </div>
          <div>
            {review.response.length > 0 ? (
              <div className="review-response">
                <h4 className="response-name">Response from the owner</h4>
                <p className="response">{review.response[0].response}</p>
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

  changePopup = () => {
    this.setState({ addReview: !this.state.addReview });
  };

  render() {
    let popup = (
      <div className="popup-inner-reviews">
        <div className="review-container">
          <div
            className="splash-header"
            style={{
              backgroundImage: "url('" + this.props.image + "')",
              backgroundPosition: "center",
              backgroundSize: "cover"
            }}
          >
            <div className="text-splash">
              <h1 className="cafe-title">{this.props.name}</h1>
              <span className="average-rating">
                {this.renderRatingTwo(this.renderAverage())}
              </span>
            </div>
          </div>

          <div className="review-list-container">
            <ul className="review-list">{this.renderReviewsResponses()}</ul>
          </div>
          <button className="button button-margin" onClick={this.changePopup}>
            Add Review
          </button>
        </div>
        <div className="close-button-reviews" onClick={this.props.closePopup}>
          <img src="/close.png" height="10px" />
        </div>
      </div>
    );
    if (this.state.addReview) {
      popup = (
        <div className="popup-inner-add-review ">
          {this.renderResponse()}
          <div className="close-button-reviews" onClick={this.props.closePopup}>
            <img src="/close.png" height="10px" />
          </div>
        </div>
      );
    }
    return <div className="popup">{popup}</div>;
  }
}

let mapStateToProps = st => {
  return { loggedIn: st.loggedIn };
};

let ReviewsPopup = connect(mapStateToProps)(unconnectedReviewsPopup);

export default ReviewsPopup;
