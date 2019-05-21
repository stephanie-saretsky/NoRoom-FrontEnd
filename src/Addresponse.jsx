import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from "sweetalert2";
let path = "http://localhost:4000/";

class UnconnectedAddresponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      reviewId: "",
      name: ""
    };
  }

  componentDidMount = () => {
    console.log("props=>", this.props);
    this.setState({
      reviewId: this.props.reviewId,
      name: this.props.ownerName
    });
  };

  handleChangeResponse = event => {
    this.setState({ response: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("response", this.state.response);
    data.append("reviewId", this.state.reviewId);
    data.append("ownerName", this.state.name);
    data.append("edit", true);
    fetch(path + "add-response", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          swal.fire({
            title: "Thank for you reply",
            type: "success",
            confirmButtonColor: "#ba5a31"
          });
          this.setState({ response: "", name: "", reviewId: "" }, () => {
            this.props.renderReviews();
          });
          // this.props.history.push("/");
          // return;
        }
      });
  };

  render = () => {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <div>
                <h2 className="edit-title">Add a response</h2>
                <textarea
                  className="text-add"
                  rows="5"
                  cols="30"
                  name="textarea"
                  value={this.state.response}
                  placeholder="Write a response to this review"
                  onChange={this.handleChangeResponse}
                  required
                />
              </div>
              <div className="submit-edit-div">
                <input
                  className="button submit-edit"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
          <div className="close-button-reviews" onClick={this.props.closePopup}>
            <img src="/close.png" height="10px" />
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    ownerName: st.username
  };
};

let Addresponse = connect(mapStateToProps)(withRouter(UnconnectedAddresponse));
export default Addresponse;
