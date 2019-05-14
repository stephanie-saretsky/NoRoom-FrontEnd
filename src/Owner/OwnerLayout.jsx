import React, { Component } from "react";
let path = "http://localhost:4000/";
import "../../css/owner-layout.css";
import ClickableChair from "./ClickableChair.jsx";
import ClickableTable from "./ClickableTable.jsx";

class OwnerLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: [],
      tables: [],
      name: "",
      desc: "",
      address: "",
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
          images: cafe.images
        });
      });
  };

  render = () => {
    return (
      <div className="owner-details">
        <div className="layout">
          {this.state.chairs.map(chair => {
            return <ClickableChair x={chair.x} y={chair.y} />;
          })}
          {this.state.tables.map(table => {
            return <ClickableTable x={table.x} y={table.y} />;
          })}
        </div>
        <div className="details">
          <h1>{this.state.name}</h1>
          <p>{this.state.description}</p>
          <p>{this.state.address}</p>
          {this.state.images.map(image => {
            return <img src={image} />;
          })}
        </div>
      </div>
    );
  };
}

export default OwnerLayout;
