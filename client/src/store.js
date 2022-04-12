import { createStore } from "redux";
import appReducer from "./reducer";

// this can pull from localstorage or a persistent data store later
let preloadedState = {
  mob: [],
};

const store = createStore(appReducer, preloadedState);

export default store;
