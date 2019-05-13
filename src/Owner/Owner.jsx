import React, { Component } from "react";
import { connect } from "react-redux";
import OwnerEdit from "./OwnerEdit.jsx";
import OwnerLayout from "./OwnerLayout.jsx";
import EditLayout from "./EditLayout.jsx";

class UnconnectedOwner extends Component {
  render = () => {
    return <EditLayout />;
    // if (this.props.edit) {
    //   return <OwnerEdit />;
    // } else {
    //   return <OwnerLayout />;
    // }
  };
}

let mapStateToProps = st => {
  return {
    edit: st.editMode
  };
};

let Owner = connect(mapStateToProps)(UnconnectedOwner);

export default Owner;
