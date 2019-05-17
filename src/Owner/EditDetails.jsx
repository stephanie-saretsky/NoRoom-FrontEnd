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
      web: "",
      elements: [],
      tel: undefined
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
    if (this.state.tag.trim().length == 0) {
      alert("Please enter a correct tag");
      event.preventDefault();
      return;
    }
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

  handleWeb = event => {
    this.setState({ web: event.target.value });
  };

  handleNum = event => {
    this.setState({ tel: event.target.value });
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

    if (files !== undefined) {
      Array.from(files).forEach(ele => {
        data.append("files", ele);
      });
    }

    data.append("name", this.state.name);
    data.append("desc", this.state.description);
    data.append("address", this.state.address);
    data.append("city", this.state.city);
    data.append("country", this.state.country);
    data.append("code", this.state.code);
    data.append("tags", JSON.stringify(tags));
    data.append("number", this.state.tel);
    data.append("url", this.state.web);
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
          tag: "",
          tel: undefined,
          files: undefined
        });
        this.props.dispatch({ type: "done-details" });
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
    if (userTyped.length >= 3 && candidates.length !== 0) {
      autocompleteBox = (
        <div className="autocomplete-container">
          <div className="autocomplete-box">
            {candidates.map(c => (
              <div
                className="childAuto"
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
        <h1 className="title">Informations</h1>
        <form className="form-style" onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={this.handleName}
                value={this.state.name}
                required
              />
              <span>Enter the name of your cafe here</span>
            </li>
            <li>
              <label htmlFor="description">Description</label>
              <textarea
                rows="4"
                cols="30"
                name="textarea"
                onChange={this.handleDesc}
                value={this.state.description}
                required
              />
              <span>Enter a description of your cafe</span>
            </li>
            <li>
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                onChange={this.handleAddress}
                value={this.state.address}
                required
              />
              <span>Example: 433 Mayor St</span>
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                onChange={this.handleCity}
                value={this.state.city}
                required
              />
              <span>Enter the city of your cafe</span>
            </li>
            <li>
              <label htmlFor="postal code">Postcode</label>
              <input
                type="text"
                onChange={this.handlePostCode}
                value={this.state.code}
                required
              />
              <span>Enter the postcode of your cafe</span>
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                onChange={this.handleCountry}
                value={this.state.country}
                required
              />
              <span>Enter the country of your cafe</span>
            </li>
            <li>
              <label htmlFor="phone number">Phone number</label>
              <input
                type="tel"
                onChange={this.handleNum}
                value={this.state.tel}
                required
              />
              <span>example: (514) 764-3589 </span>
            </li>
            <li>
              <label htmlFor="website">Cafe website</label>
              <input
                type="text"
                onChange={this.handleWeb}
                value={this.state.web}
              />
              <span>example: www.moncafe.com</span>
            </li>
            <li className="vertical-flex">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                onChange={this.handleTags}
                value={this.state.tag}
              />
              {autocompleteBox}
              <button className="add" onClick={this.handleOnclick}>
                Add
              </button>
              <span>example: "vegan, fancy, eco-friendly, ..."</span>
            </li>
            <div className="tag-container">
              {this.state.tags.map((tag, i) => {
                return (
                  <div className="tag" key={tag + ""}>
                    <p>
                      {tag}
                      <span
                        className="delete-tag"
                        onClick={() => {
                          this.handleDelete(i);
                        }}
                      >
                        x
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="last-file">
              <input
                className="custom-file-input"
                type="file"
                onChange={this.handleFiles}
                multiple
              />
              <span>maximum of 3 files</span>
            </div>
            <div>
              <input className="submit" type="submit" value="Add Your Cafe" />
            </div>
          </ul>
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
