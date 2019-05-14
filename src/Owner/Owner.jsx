import React, { Component } from "react";
import { connect } from "react-redux";
import OwnerEdit from "./OwnerEdit.jsx";
import OwnerLayout from "./OwnerLayout.jsx";
import EditLayout from "./EditLayout.jsx";

class UnconnectedOwner extends Component {
  render = () => {
    console.log(this.props.username);
    let editMode = localStorage.getItem(this.props.username + "-edit");
    if (editMode === null) {
      return <OwnerEdit />;
    } else {
      return <OwnerLayout />;
    }
  };
}

let mapStateToProps = st => {
  return {
    edit: st.editMode,
    username: st.username
  };
};

let Owner = connect(mapStateToProps)(UnconnectedOwner);

export default Owner;
