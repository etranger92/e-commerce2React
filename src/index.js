import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducers from "./Redux/Reducers/allReducers";
//Install Redux npm install --save redux-thunk
// Import thunk and applyMiddleware (createStore) then applyMiddleware in const store.

import thunk from "redux-thunk";

//This line is due to solve the issue that I had when I tried to add windows__REDUX and thunk at the same time.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />{" "}
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
