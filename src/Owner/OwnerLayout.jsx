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
      cafeId: "",
      images: []
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
          images: cafe.images,
          cafeId: cafe._id
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

  render = () => {
    return (
      <div className="owner-container">
        <div className="owner-details">
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
              <h2 className="instructions-title">Instructions:</h2>
              <p>
                Click on a seat to turn it orange and indicate it has been
                taken.
              </p>
              <button onClick={this.editLayout}>Edit Layout</button>
            </div>
          </div>
          <h2 className="instructions-title">{this.state.name + ":"}</h2>
          <div className="details-owner-cafe">
            <div className="taken-images">
              {this.state.images.map(image => {
                return <img height="300px" src={image} />;
              })}
            </div>
            <div>
              <p className="taken-p">{"Description: " + this.state.desc}</p>
              <p className="taken-p">{"Address: " + this.state.address}</p>
            </div>
            <button onClick={this.editDetails}>Edit Café Details</button>
          </div>
          <Link
            to={{
              pathname: "/reviews/" + this.state.cafeId.toString(),
              state: { name: this.state.name }
            }}
          >
            Reviews
          </Link>
        </div>
      </div>
    );
  };
}

let OwnerLayout = connect()(withRouter(UnconnectedOwnerLayout));

export default OwnerLayout;
