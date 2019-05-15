import React, { Component } from "react";
import { connect } from "react-redux";
let path = "http://localhost:4000/";

class UnconnectedEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      address: "",
      city: "",
      code: "",
      country: "",
      files: undefined
    };
  }

  handleCity = event => {
    this.setState({ city: event.target.value });
  };

  handleCountry = event => {
    this.setState({ country: event.target.value });
  };

  handlePostCode = event => {
    this.setState({ code: event.target.value });
  };

  handleName = event => {
    this.setState({ name: event.target.value });
  };

  handleDesc = event => {
    this.setState({ description: event.target.value });
  };

  handleAddress = event => {
    this.setState({ address: event.target.value });
  };

  handleFiles = event => {
    let files = event.target.files;

    this.setState({ files: files });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    let files = this.state.files;
    data.append("name", this.state.name);
    data.append("desc", this.state.description);
    data.append("address", this.state.address);
    data.append("city", this.state.city);
    data.append("country", this.state.country);
    data.append("code", this.state.code);
    Array.from(files).forEach(ele => {
      data.append("files", ele);
    });

    fetch(path + "add-cafe", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(responseHeader => {
        return responseHeader.text();
      })
      .then(responseBody => {
        let response = JSON.parse(responseBody);
        let cafeId = response.cafeId;
        let address = response.address;
        let city = response.city;
        let urlAddress = address.split(" ").join("+") + "+" + city;
        this.setState({
          name: "",
          description: "",
          address: "",
          city: "",
          code: "",
          country: "",
          files: undefined
        });
        localStorage.setItem(this.props.username + "-layout", "true");
        this.props.dispatch({ type: "done-details", cafeId });
        let APIkey = "key=AIzaSyCWyXDRjjUoo8QrnGjIZAwNj3t3QivVGhs";
        return fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            urlAddress +
            "&" +
            APIkey
        )
          .then(responseHeader => {
            return responseHeader.text();
          })
          .then(responseBody => {
            let parsed = JSON.parse(responseBody);
            let location = JSON.stringify(parsed.results[0].geometry.location);
            console.log("Location=>", location);
            let data = new FormData();
            data.append("location", location);
            data.append("cafeId", cafeId);
            return fetch(path + "add-location", {
              credentials: "include",
              method: "POST",
              body: data
            })
              .then(responseHeader => {
                return responseHeader.text();
              })
              .then(responseBody => {
                return console.log(responseBody);
              });
          });
      });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleName}
            value={this.state.name}
            placeholder="Name"
            required
          />
          <textarea
            rows="4"
            cols="50"
            name="textarea"
            onChange={this.handleDesc}
            value={this.state.description}
            placeholder="Description"
            required
          />
          <input
            type="text"
            onChange={this.handleAddress}
            value={this.state.address}
            placeholder="Address"
            required
          />
          <input
            type="text"
            onChange={this.handleCity}
            value={this.state.city}
            placeholder="city"
            required
          />
          <input
            type="text"
            onChange={this.handlePostCode}
            value={this.state.code}
            placeholder="postal code"
            required
          />
          <input
            type="text"
            onChange={this.handleCountry}
            value={this.state.country}
            placeholder="country"
            required
          />

          <input type="file" onChange={this.handleFiles} multiple />
          <input type="submit" value="Add Your Cafe" />
        </form>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    username: st.username
  };
};

let EditDetails = connect(mapStateToProps)(UnconnectedEditDetails);

export default EditDetails;
