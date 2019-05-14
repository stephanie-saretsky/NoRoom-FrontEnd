import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, username: action.username };
  }
  if (action.type === "logout-success") {
    return { ...state, loggedIn: false, username: "" };
  }
  if (action.type === "done-edit") {
    return { ...state, editMode: false };
  }
  if (action.type === "done-details") {
    return { ...state, layoutMode: true, cafeId: action.cafeId };
  }
  if (action.type === "search-input") {
    return { ...state, search: action.search };
  }
  return state;
};

let store = createStore(
  reducer,
  {
    loggedIn: false,
    editMode: true,
    layoutMode: false,
    search: "",
    username: "",
    cafeId: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
