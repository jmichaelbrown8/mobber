import { createStore } from "redux";
import { appReducer } from "./reducer";

// this can pull from localstorage or a persistent data store later
let preloadedState = {
  mob: [],
  rotations: 0,
  time: {
    // all times stored as seconds
    elapsed: 0,
    running: false,
    remaining: 900,
    duration: 900,
  },
};

// TODO: Convert to configureStore as recommended
const store = createStore(appReducer, preloadedState);

export default store;
