import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import graphEditorReducer from "./redux/reducers";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { POSITION_NODE, DRAG_MOUSE_POSITION } from "./redux/actions";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: (getState, action) =>
    action.type === POSITION_NODE || action.type === DRAG_MOUSE_POSITION
});

export const store = createStore(
  graphEditorReducer,
  composeEnhancer(applyMiddleware(thunk, logger))

  // other store enhancers if any
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
