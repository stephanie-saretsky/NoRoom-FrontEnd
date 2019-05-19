import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
let path = "http://localhost:4000/";

class UnconnectedEditResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      reviewId: "",
      name: ""
    };
  }

  componentDidMount = () => {
    console.log("this.props", this.props);
    let data = new FormData();
    data.append("reviewId", this.props.reviewId);
    fetch(path + "get-response", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let parsed = JSON.parse(responseBody);
        // this.setState({
        //   response: parsed.response,
        //   name: parsed.ownerName,
        //   reviewId: parsed.reviewId
        // });
      });
  };

  handleChangeResponse = event => {
    this.setState({ response: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("response", this.state.response);
    data.append("reviewId", this.props.reviewId);
    fetch(path + "edit-response", {
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
          alert("Thank you for the response");
          this.setState({ response: "", name: "", reviewId: "" }, () => {
            this.props.renderReviews();
          });
          this.props.history.push("/");
          return;
        }
        alert("Please make sure you fill out all forms");
        return;
      });
  };

  render = () => {
    return (
      <div>
        <div>
          <h2>Edit response</h2>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <p>response: </p>
                <textarea
                  className="text-add"
                  rows="5"
                  cols="30"
                  name="textarea"
                  value={this.state.response}
                  onChange={this.handleChangeResponse}
                  required
                />
              </div>
              <div>
                <input type="submit" value="Add" />
              </div>
            </form>
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

let EditResponse = connect(mapStateToProps)(
  withRouter(UnconnectedEditResponse)
);

export default EditResponse;
