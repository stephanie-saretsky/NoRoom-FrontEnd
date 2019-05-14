import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

class Map extends Component {
  state = {
    viewport: {
      width: 1250,
      height: 600,
      latitude: 45.5017,
      longitude: -73.5673,
      zoom: 13
    }
  };

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic25zYXJldHNreSIsImEiOiJjanZtdDhwYWYxNGxlNDRwaDY1dHYyY2I4In0.yDAuKpeinAJb8LCz2eYWHg"
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Marker
          latitude={45.5}
          longitude={-73.57}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img src="/cafemap.png" height="50" />
        </Marker>
      </ReactMapGL>
    );
  }
}

export default Map;
