import React, { Component } from "react";
import { Route, Link, BrowserRouter } from "react-router-dom";
import "../css/main.css";
import { connect } from "react-redux";
import AllCafes from "./AllCafes.jsx";
import Homepage from "./Homepage.jsx";
let path = "http://localhost:4000/";

class UnconnectedApp extends Component {
  renderHomepage = () => {
    return <Homepage />;
  };

  renderCafes = () => {
    return <AllCafes />;
  };

  renderCafeDetails = () => {};

  render = () => {
    return (
      <BrowserRouter>
        <div className="global">
          <Route exact={true} path="/" render={this.renderHomepage} />
          <Route exact={true} path="/cafes" render={this.renderCafes} />
          <Route exact={true} path="/cafes/:cid" render={this.cafeDetails} />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = st => {
  return { loggedIn: st.loggedIn };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
