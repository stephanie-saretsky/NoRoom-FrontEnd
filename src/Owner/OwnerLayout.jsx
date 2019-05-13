import React, { Component } from "react";
let path = "http://demo5595251.mockable.io/";
import "../../css/owner-layout.css";
import ClickableChair from "./ClickableChair.jsx";
import ClickableTable from "./ClickableTable.jsx";

class OwnerLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: [],
      tables: [],
      details: []
    };
  }

  // componentDidMount = () => {
  //   fetch(path + "cafe-owner-details", {
  //     credentials: "include"
  //   })
  //     .then(header => {
  //       return header.text();
  //     })
  //     .then(body => {
  //       let parsed = JSON.parse(body);
  //       if (parsed.success) {
  //         this.setState({
  //           chairs: this.parsed.chairs,
  //           tables: this.parsed.tables,
  //           details: this.parsed.details
  //         });
  //       }
  //     });
  // };

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
      </div>
    );
  };
}

export default OwnerLayout;
