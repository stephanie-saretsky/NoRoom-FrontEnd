import React, { Component } from "react";
import { connect } from "react-redux";
import "../../css/autocomplete.css";
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
      files: undefined,
      tags: [],
      tag: "",
      auto: "",
      elements: []
    };
  }

  componentDidMount = () => {
    fetch(path + "autocomplete")
      .then(x => {
        return x.text();
      })
      .then(response => {
        let parsed = JSON.parse(response);
        this.setState({ elements: parsed.elements });
      });
  };

  autoValue = c => {
    event.preventDefault();
    this.setState({ tag: c }, () => {
      this.handleOnclick();
    });
  };

  handleDelete = i => {
    event.preventDefault();
    let one = this.state.tags.slice(0, i);
    let two = this.state.tags.slice(i + 1);
    let tags = one.concat(two);
    this.setState({ tags: tags });
  };

  handleOnclick = () => {
    event.preventDefault();
    this.setState(
      { tags: this.state.tags.concat(this.state.tag), tag: "" },
      () => {
        let elements = this.state.elements;
        this.state.tags.forEach(elem => {
          if (elements.indexOf(elem) === -1) {
            elements = elements.concat(elem);
          }
        });
        let data = new FormData();
        data.append("elements", JSON.stringify(elements));
        fetch(path + "checkAuto", {
          method: "POST",
          body: data
        })
          .then(x => {
            return x.text();
          })
          .then(response => {
            response;
          });
      }
    );
  };

  handleTags = event => {
    this.setState({ tag: event.target.value });
  };

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
    let tags = this.state.tags;
    data.append("name", this.state.name);
    data.append("desc", this.state.description);
    data.append("address", this.state.address);
    data.append("city", this.state.city);
    data.append("country", this.state.country);
    data.append("code", this.state.code);
    data.append("tags", JSON.stringify(tags));
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
                return responseBody;
              });
          });
      });
  };

  render = () => {
    let userTyped = this.state.tag;
    let candidates = this.state.elements.filter(e => e.includes(userTyped));
    let autocompleteBox = undefined;
    if (userTyped.length > 0 && candidates.length !== 0) {
      autocompleteBox = (
        <div className="autocomplete-container">
          <div className="autocomplete-box">
            {candidates.map(c => (
              <div
                onClick={() => {
                  this.autoValue(c);
                }}
                key={c + ""}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      );
    }
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
          <div className="vertical-flex">
            <input
              type="text"
              placeholder="Add a new tag"
              onChange={this.handleTags}
              value={this.state.tag}
            />
            {autocompleteBox}
          </div>
          <button onClick={this.handleOnclick}>Add</button>
          <div>
            {this.state.tags.map((tag, i) => {
              return (
                <div key={tag + ""}>
                  {tag}
                  <button
                    onClick={() => {
                      this.handleDelete(i);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
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
