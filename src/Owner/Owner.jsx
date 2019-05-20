import React, { Component } from "react";
import { connect } from "react-redux";
import OwnerEdit from "./OwnerEdit.jsx";
import OwnerLayout from "./OwnerLayout.jsx";
let path = "http://localhost:4000/";

class UnconnectedOwner extends Component {
  constructor() {
    super();
    this.state = {
      layout: false
    };
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
          if (parsed.layout) {
            this.props.dispatch({ type: "done-edit" });
          }
        }
      });
  };

  render = () => {
    if (this.props.edit || this.props.secondEdit) {
      return <OwnerEdit />;
    } else {
      return <OwnerLayout />;
    }
  };
}

let mapStateToProps = st => {
  return {
    edit: st.editMode,
    username: st.username,
    secondEdit: st.secondEditMode
  };
};

let Owner = connect(mapStateToProps)(UnconnectedOwner);

export default Owner;
