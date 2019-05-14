import React, { Component } from "react";
import { connect } from "react-redux";
import EditLayout from "./EditLayout.jsx";
import EditDetails from "./EditDetails.jsx";

class UnconnectedOwnerEdit extends Component {
  render = () => {
    let layoutMode = localStorage.getItem(this.props.username + "-layout");
    if (layoutMode === "true") {
      return <EditLayout />;
    } else {
      return <EditDetails />;
    }
  };
}

let mapStateToProps = st => {
  return {
    layout: st.layoutMode,
    username: st.username
  };
};

let OwnerEdit = connect(mapStateToProps)(UnconnectedOwnerEdit);

export default OwnerEdit;
