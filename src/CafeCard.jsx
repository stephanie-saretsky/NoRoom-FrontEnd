import React, { Component } from "react";
import { Link } from "react-router-dom";

class CafeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: this.props.cafe.images[0]
    };
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.cafe.name, this.props);
    if (prevProps.cafe.images[0] !== this.props.cafe.images[0]) {
      this.setState({ activeImage: this.props.cafe.images[0] });
    }
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
      // <div className="col">
      <div className="cafe-card">
        <button className="button-left" onClick={this.moveLeft}>
          &lt;
        </button>
        <img className="cafe-photo" src={this.state.activeImage} />
        <button className="button-right" onClick={this.moveRight}>
          &gt;
        </button>
        <h2>{cafe.name}</h2>
        <p className="desc">{cafe.desc}</p>
        <Link to={"cafe/" + cafe._id}>
          <button className="button">Is There Room?</button>
        </Link>
      </div>
      // </div>
    );
  }
}

export default CafeCard;
