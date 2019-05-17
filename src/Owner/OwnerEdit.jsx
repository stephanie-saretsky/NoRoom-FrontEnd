import React, { Component } from "react";
import { connect } from "react-redux";
import EditLayout from "./EditLayout.jsx";
import EditDetails from "./EditDetails.jsx";
import OwnerEditDetails from "./OwnerEditDetails.jsx";
let path = "http://localhost:4000/";

class UnconnectedOwnerEdit extends Component {
  constructor() {
    super();
  }

  componentDidMount = () => {
    fetch(path + "edit-check", {
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          if (parsed.secondEdit) {
            this.props.dispatch({ type: "edit-details" });
          }
          if (parsed.details) {
            this.props.dispatch({ type: "done-details" });
          }
        }
      });
  };

  render = () => {
    if (this.props.layout) {
      return <EditLayout />;
    } else if (this.props.secondEdit) {
      return <OwnerEditDetails />;
    } else {
      return <EditDetails />;
    }
  };
}

let mapStateToProps = st => {
  return {
    layout: st.layoutMode,
    username: st.username,
    secondEdit: st.secondEditMode
  };
};

let OwnerEdit = connect(mapStateToProps)(UnconnectedOwnerEdit);

export default OwnerEdit;
