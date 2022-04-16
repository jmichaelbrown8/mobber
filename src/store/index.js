import { createStore } from "redux";
import appReducer from "./reducer";
import { saveState, loadState } from "../utils/localStorage";

// this can pull from localstorage or a persistent data store later
let preloadedState = {
  mob: [],
  rotations: 0,
  elapsed: 0,
  time: {
    // all times stored as seconds
    elapsed: 0,
    running: false,
    remaining: 900,
    duration: 900,
    timerStarted: null,
  },
};

const localStorageState = loadState();
if (localStorageState) {
  preloadedState = {
    ...preloadedState,
    ...localStorageState,
  };
}

const store = createStore(appReducer, preloadedState);

let lastState = store.getState();
console.log(lastState.time);

store.subscribe(() => {
  console.log("subscription");
  saveState(store.getState());
});

export default store;
