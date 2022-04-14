import { createStore } from "redux";
import appReducer from "./reducer";

// this can pull from localstorage or a persistent data store later
let preloadedState = {
  mob: [],
  rotations: 0,
  time: {
    // all times stored as seconds
    elapsed: 0,
    running: false,
    remaining: 0,
    duration: 900,
  },
};

const store = createStore(appReducer, preloadedState);

export default store;
