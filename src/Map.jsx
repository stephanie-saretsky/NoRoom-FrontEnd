import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { connect } from "react-redux";
let path = "http://localhost:4000/";

class UnconnectedMap extends Component {
  state = {
    viewport: {
      width: 1250,
      height: 600,
      latitude: 45.5017,
      longitude: -73.5673,
      zoom: 13
    },
    cafes: []
  };

  componentDidMount = () => {
    fetch(path + "/cafes");
  };

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic25zYXJldHNreSIsImEiOiJjanZtdDhwYWYxNGxlNDRwaDY1dHYyY2I4In0.yDAuKpeinAJb8LCz2eYWHg"
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {this.state.cafes.map(c => {
          <Marker
            latitude={c.latitude}
            longitude={c.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <img src="/cafemap.png" height="50" />
          </Marker>;
        })}
      </ReactMapGL>
    );
  }
}

let mapStateToProps = state => {
  return { search: state.search };
};

let Map = connect(mapStateToProps)(UnconnectedMap);

export default Map;
