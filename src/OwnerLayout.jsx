import React, { Component } from "react";
let path = "http://demo5595251.mockable.io/";

class OwnerLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: [],
      tables: [],
      details: []
    };
  }

  componentDidMount = () => {
    fetch(path + "cafe-owner-details", {
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          this.setState({
            chairs: this.parsed.chairs,
            tables: this.parsed.tables,
            details: this.parsed.details
          });
        }
      });
  };

  render = () => {
    return (
      <div>
        <div className="layout">{this.state.chairs.map(chair => {})}</div>
      </div>
    );
  };
}
