import React, { Component } from "react";

class Reviews extends Component {
  constructor() {
    super();
    this.state = {};
  }

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
    return (
      <div>
        <h1>{this.props.name + " reviews"}</h1>
        <ul>
          {this.props.reviews.map(review => {
            return <li>{review.review}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Reviews;
