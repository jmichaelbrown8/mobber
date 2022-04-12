import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

console.log("Initial state: ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("State after dispatch: ", store.getState())
);

store.dispatch({ type: "ADD_MEMBER", payload: "J." });
store.dispatch({ type: "ADD_MEMBER", payload: "Claire" });
store.dispatch({ type: "ADD_MEMBER", payload: "Wesley" });
store.dispatch({ type: "ADD_MEMBER", payload: "Luke" });

unsubscribe();

store.dispatch({ type: "ADD_MEMBER", payload: "Grandpa" });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
