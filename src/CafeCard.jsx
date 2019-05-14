import React, { Component } from "react";
import { Link } from "react-router-dom";

class CafeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: this.props.cafe.images[0]
    };
  }

  moveLeft = e => {
    e.preventDefault();
    if (this.state.activeImage === this.props.cafe.images[0]) {
      return this.setState({ activeImage: this.props.cafe.images[2] });
    } else if (this.state.activeImage === this.props.cafe.images[2]) {
      return this.setState({ activeImage: this.props.cafe.images[1] });
    } else if (this.state.activeImage === this.props.cafe.images[1]) {
      return this.setState({ activeImage: this.props.cafe.images[0] });
    }
  };

  moveRight = e => {
    e.preventDefault();
    if (this.state.activeImage === this.props.cafe.images[0]) {
      return this.setState({ activeImage: this.props.cafe.images[1] });
    } else if (this.state.activeImage === this.props.cafe.images[1]) {
      return this.setState({ activeImage: this.props.cafe.images[2] });
    } else if (this.state.activeImage === this.props.cafe.images[2]) {
      return this.setState({ activeImage: this.props.cafe.images[0] });
    }
  };

  render() {
    const { cafe } = this.props;

    return (
      <div className="cafe-card">
        <button onClick={this.moveLeft} />
        <Link to={"cafe/" + cafe._id}>
          <img className="cafe-photo" src={this.state.activeImage} />
        </Link>
        <button onClick={this.moveRight} />
        {cafe.name}
      </div>
    );
  }
}

export default CafeCard;
