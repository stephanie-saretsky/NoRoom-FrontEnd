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
    popupInfo: null
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
    return (
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic25zYXJldHNreSIsImEiOiJjanZtdDhwYWYxNGxlNDRwaDY1dHYyY2I4In0.yDAuKpeinAJb8LCz2eYWHg"
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {this.props.cafes.map(this.renderMarker)}
        {this.renderPopup()}
      </ReactMapGL>
    );
  }
}

let mapStateToProps = state => {
  return { cafes: state.cafes };
};

let Map = connect(mapStateToProps)(UnconnectedMap);

export default Map;
