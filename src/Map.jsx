import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import CafeInfo from "./CafeInfo.jsx";
// import "../css/map.css";
let path = "http://localhost:4000/";

class UnconnectedMap extends Component {
  state = {
    viewport: {
      width: 1330,
      height: 590,
      latitude: 45.5232,
      longitude: -73.587,
      zoom: 12.5
    },
    cafes: [],
    popupInfo: null
  };

  componentDidMount = () => {
    if (this.props.search === "") {
      fetch(path + "cafes", { method: "GET" })
        .then(x => {
          return x.text();
        })
        .then(responseBody => {
          console.log(responseBody, "RESPONSE BODY");
          let body = JSON.parse(responseBody);
          console.log(body, "JSON BODY");
          if (body.success) {
            this.setState({ cafes: body.cafeList });
          }
        });
    } else {
      console.log(this.props.search, "search value");
      fetch(path + "search-cafe?search=" + this.props.search, {
        method: "GET"
      })
        .then(response => response.text())
        .then(response => {
          let parsedResponse = JSON.parse(response);
          console.log("JSON RESPONSE", parsedResponse);
          if (parsedResponse.success) {
            console.log("array of search", parsedResponse.cafes);
            this.setState({ cafes: parsedResponse.cafes });
          }
        });
      this.props.dispatch({ type: "search-input", search: "" });
    }
  };

  renderMarker = c => {
    return (
      <Marker
        latitude={c.location.lat}
        longitude={c.location.lng}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <img
          src="/cafemap.png"
          height="50"
          onClick={() => this.setState({ popupInfo: c })}
        />
      </Marker>
    );
  };

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          className="map-popup"
          tipSize={5}
          anchor="top"
          longitude={popupInfo.location.lng}
          latitude={popupInfo.location.lat}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CafeInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    console.log("CAFE STATE", this.state.cafes);
    let location = this.state.cafes.filter(c => {
      return c.location !== undefined;
    });
    console.log(location, "LOCATION");
    return (
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic25zYXJldHNreSIsImEiOiJjanZtdDhwYWYxNGxlNDRwaDY1dHYyY2I4In0.yDAuKpeinAJb8LCz2eYWHg"
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {location.map(this.renderMarker)}
        {this.renderPopup()}
      </ReactMapGL>
    );
  }
}

let mapStateToProps = state => {
  return { search: state.search };
};

let Map = connect(mapStateToProps)(UnconnectedMap);

export default Map;
