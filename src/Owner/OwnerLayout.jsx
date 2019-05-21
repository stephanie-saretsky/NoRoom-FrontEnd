import React, { Component } from "react";
import { connect } from "react-redux";
let path = "http://localhost:4000/";
import "../../css/owner-layout.css";
import ClickableChair from "./ClickableChair.jsx";
import ClickableTable from "./ClickableTable.jsx";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class UnconnectedOwnerLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: [],
      tables: [],
      name: "",
      desc: "",
      address: "",
      code: "",
      city: "",
      country: "",
      number: "",
      website: "",
      tags: [],
      cafeId: "",
      images: [],
      activeImage: ""
    };
  }

  componentDidMount = () => {
    fetch(path + "cafe-owner-details", {
      method: "POST",
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        let cafe = parsed[0];
        this.setState({
          chairs: cafe.chairs,
          tables: cafe.tables,
          name: cafe.name,
          desc: cafe.desc,
          address: cafe.address,
          code: cafe.code,
          city: cafe.city,
          country: cafe.country,
          number: cafe.number,
          website: cafe.url,
          tags: cafe.tags,
          images: cafe.images,
          cafeId: cafe._id,
          activeImage: cafe.images[0]
        });
      });
  };

  editLayout = () => {
    fetch(path + "edit-layout", {
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          this.props.dispatch({ type: "edit-layout" });
        }
      });
  };

  editDetails = () => {
    fetch(path + "edit-details", {
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          this.props.dispatch({ type: "edit-details" });
        }
      });
  };

  moveLeft = e => {
    e.preventDefault();
    if (this.state.activeImage === this.state.images[0]) {
      return this.setState({ activeImage: this.state.images[2] });
    } else if (this.state.activeImage === this.state.images[2]) {
      return this.setState({ activeImage: this.state.images[1] });
    } else if (this.state.activeImage === this.state.images[1]) {
      return this.setState({ activeImage: this.state.images[0] });
    }
  };

  moveRight = e => {
    e.preventDefault();
    if (this.state.activeImage === this.state.images[0]) {
      return this.setState({ activeImage: this.state.images[1] });
    } else if (this.state.activeImage === this.state.images[1]) {
      return this.setState({ activeImage: this.state.images[2] });
    } else if (this.state.activeImage === this.state.images[2]) {
      return this.setState({ activeImage: this.state.images[0] });
    }
  };

  render = () => {
    return (
      <div className="owner-container">
        <div className="owner-details">
          <div className="title-color">
            <h1 className="details-title">
              {"Business Profile - " + this.state.name}
            </h1>
          </div>
          <div className="layout-container">
            <div className="layout">
              {this.state.chairs.map(chair => {
                return (
                  <ClickableChair
                    x={chair.x}
                    y={chair.y}
                    id={chair.id}
                    taken={chair.taken}
                    cafeId={this.state.cafeId}
                  />
                );
              })}
              {this.state.tables.map(table => {
                return (
                  <ClickableTable
                    x={table.x}
                    y={table.y}
                    cafeId={this.state.cafeId}
                  />
                );
              })}
            </div>
            <div className="instructions-taken">
              <h2 className="instructions-title">Instructions</h2>

              <p className="taken-p">
                Click on a seat to turn it orange and indicate it has been
                taken.
              </p>
              <button className="edit-layout-button" onClick={this.editLayout}>
                Edit Layout
              </button>
            </div>
          </div>

          <div className="details-owner-cafe">
            <h2 className="information-title">Café Information </h2>
            <div className="push-margin">
              <div className="details-container">
                <div className="taken-images">
                  <button className="button-left-owner" onClick={this.moveLeft}>
                    &lt;
                  </button>
                  <img src={this.state.activeImage} height="300px" />
                  <button
                    className="button-right-owner"
                    onClick={this.moveRight}
                  >
                    &gt;
                  </button>
                </div>
                <div className="information-text">
                  <p className="taken-p">
                    Description: <span className="pink">{this.state.desc}</span>
                  </p>
                  <p className="taken-p">
                    Address:{" "}
                    <span className="pink">
                      {this.state.address +
                        ", " +
                        this.state.city +
                        ", " +
                        this.state.country +
                        " " +
                        this.state.code}
                    </span>
                  </p>
                  <p className="taken-p">
                    Phone Number:{" "}
                    <span className="pink">{this.state.number}</span>
                  </p>
                  <p className="taken-p">
                    {"Website: "}{" "}
                    <a className="cafe-link" href={this.state.website}>
                      {this.state.website}
                    </a>
                  </p>
                  <p className="taken-tag">
                    Tags:{" "}
                    {this.state.tags.map(tag => {
                      return (
                        <span className="tag-span">{"#" + tag + " "}</span>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="button-div">
              <div className="button-margin">
                <div>
                  <button
                    className="edit-layout-button button-position"
                    onClick={this.editDetails}
                  >
                    Edit Café Details
                  </button>
                </div>

                <Link
                  className="see-reviews-button"
                  to={{
                    pathname: "/reviews/" + this.state.cafeId.toString(),
                    state: { name: this.state.name }
                  }}
                >
                  See Reviews for Your Café
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

let OwnerLayout = connect()(withRouter(UnconnectedOwnerLayout));

export default OwnerLayout;
