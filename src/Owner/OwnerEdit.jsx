import React, { Component } from "react";
import { connect } from "react-redux";
import EditLayout from "./EditLayout.jsx";

class UnconnectedOwnerEdit extends Component {
  render = () => {
    if (this.props.layout) {
      return <EditLayout />;
    } else {
      return <EditDetails />;
    }
  };
}

let mapStateToProps = st => {
  return {
    layout: st.layoutMode
  };
};

let OwnerEdit = connect(mapStateToProps)(UnconnectedOwnerEdit);

export default OwnerEdit;
