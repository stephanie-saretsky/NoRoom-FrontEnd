import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../css/main.css";
import { connect } from "react-redux";
import AllCafes from "./AllCafes.jsx";
import Homepage from "./Homepage.jsx";
import Footer from "./Footer.jsx";
import Owner from "./Owner/Owner.jsx";
import NavBar from "./NavBar.jsx";
import CafeDetails from "./CafeDetails.jsx";
import Reviews from "./Reviews.jsx";
let path = "http://localhost:4000/";

class UnconnectedApp extends Component {
  constructor() {
    super();
  }
  componentDidMount = () => {
    fetch(path + "login-check", {
      credentials: "include"
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        let parsed = JSON.parse(body);
        if (parsed.success) {
          this.props.dispatch({
            type: "login-success",
            username: parsed.username
          });
        }
      });
  };

  renderHomepage = () => {
    if (this.props.loggedIn) {
      return <Owner />;
    }
    return <Homepage />;
  };

  renderCafes = () => {
    return (
      <div>
        <NavBar searchEnabled={true} />
        <AllCafes />
      </div>
    );
  };

  renderCafeDetails = routerData => {
    let cafeId = routerData.match.params.cid;

    return (
      <div>
        <NavBar />
        <CafeDetails cafeId={cafeId} />
      </div>
    );
  };

  renderReviews = routerData => {
    let cafeId = routerData.match.params.rid;
    return (
      <div>
        <Reviews cafeId={cafeId} name={routerData.location.state.name} />
      </div>
    );
  };

  render = () => {
    return (
      <div>
        <div className="global">
          <Route
            exact={true}
            path="/reviews/:rid"
            render={this.renderReviews}
          />
          <Route exact={true} path="/" render={this.renderHomepage} />
          <Route exact={true} path="/cafes" render={this.renderCafes} />
          <Route
            exact={true}
            path="/cafe/:cid"
            render={this.renderCafeDetails}
          />
        </div>
        <Footer />
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { loggedIn: st.loggedIn };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
