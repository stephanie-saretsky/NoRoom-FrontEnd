import ReactDOM from "react-dom";
import "../css/main.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./store.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
