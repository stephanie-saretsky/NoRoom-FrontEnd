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
      fileMessage: "No Files Selected",
      images: [],
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
      swal.fire({
        title: "Please enter a correct tag",
        type: "error",
        confirmButtonColor: "#ba5a31"
      });
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
    let paths = [];
    for (let i = 0; i < files.length; i++) {
      paths.push(URL.createObjectURL(files[i]));
    }

    let value = event.target.value;

    let message = "No Files Selected";
    if (files && files.length > 1) {
      message = files.length + " files selected";
    } else {
      message = value.split("\\").pop();
    }

    this.setState({ files: files, images: paths, fileMessage: message });
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
          files: undefined,
          fileMessage: "No Files Selected",
          images: []
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
        <h1 className="title">Add a Café</h1>
        <form className="form-style" onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <label htmlFor="name">Café Name</label>
              <input
                type="text"
                onChange={this.handleName}
                value={this.state.name}
                required
              />
              <span />
            </li>
            <li>
              <label htmlFor="description">Description</label>
              <textarea
                name="textarea"
                onChange={this.handleDesc}
                value={this.state.description}
                required
              />
              <span />
            </li>
            <li>
              <label htmlFor="Address">Street Address</label>
              <input
                type="text"
                onChange={this.handleAddress}
                value={this.state.address}
                required
              />
              <span />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                onChange={this.handleCity}
                value={this.state.city}
                required
              />
              <span />
            </li>
            <li>
              <label htmlFor="postal code">Postcode</label>
              <input
                type="text"
                onChange={this.handlePostCode}
                value={this.state.code}
                required
              />
              <span />
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                onChange={this.handleCountry}
                value={this.state.country}
                required
              />
              <span />
            </li>
            <li>
              <label htmlFor="phone number">Phone number</label>
              <input
                type="tel"
                onChange={this.handleNum}
                value={this.state.tel}
                required
                placeholder="Format: (514) 764-3589"
              />
              <span> </span>
            </li>
            <li>
              <label htmlFor="website">Café website</label>
              <input
                type="text"
                onChange={this.handleWeb}
                value={this.state.web}
                placeholder="Format: http://www.moncafe.com"
              />
              <span />
            </li>
            <li className="vertical-flex">
              <label htmlFor="tags">Tags</label>
              <div className="add-container">
                <input
                  type="text"
                  onChange={this.handleTags}
                  value={this.state.tag}
                  placeholder="Example: vegan, cozy, eco-friendly, ..."
                />

                <button className="add" onClick={this.handleOnclick}>
                  Add
                </button>
              </div>
              {autocompleteBox}
              <span />
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
              <div>
                <input
                  className="custom-file-input"
                  type="file"
                  id="file"
                  onChange={this.handleFiles}
                  multiple
                />
                <label className="file-label" for="file">
                  Add Images
                </label>
                <span className="file-selection">{this.state.fileMessage}</span>
              </div>
              <p className="file-selection-p">
                Please upload three pictures of your café in total.
              </p>
              <div className="file-preview-container">
                {this.state.images.map(image => {
                  return (
                    <img className="file-preview" src={image} height="100px" />
                  );
                })}
              </div>
            </div>
            <div className="submit-container">
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
