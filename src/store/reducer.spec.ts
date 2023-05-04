import { initialState, appReducer } from "./reducer";

describe("Mob reducers", () => {
  it("Adds a member of the mob", () => {
    initialState.mob = ["Claire"];

    const action = { type: "ADD_MEMBER", payload: "J" };
    const result = appReducer(initialState, action);
    expect(result.mob).toEqual(["Claire", "J"]);
  });

  it("Removes a member of the mob", () => {
    initialState.mob = ["Claire", "J"];

    const action = { type: "REMOVE_MEMBER", payload: 0 };
    const result = appReducer(initialState, action);
    expect(result.mob).toEqual(["J"]);
  });

  it("Rotates the members of the mob", () => {
    initialState.mob = ["Claire", "J"];

    const action = { type: "ROTATE_MEMBERS" };
    const result = appReducer(initialState, action);
    expect(result.mob).toEqual(["J", "Claire"]);
  });

  it("Sets the members of the mob", () => {
    const action = { type: "SET_MEMBERS", payload: ["Claire", "J"] };
    const result = appReducer(initialState, action);
    expect(result.mob).toEqual(["Claire", "J"]);
  });
});

describe("Time reducers", () => {
  it("Decrements the time remaining and increments the elapsed time", () => {
    initialState.time = { ...initialState.time, remaining: 10, elapsed: 10 };

    initialState.time = { ...initialState.time };
    const action = { type: "DECREMENT_TIMER" };
    const result = appReducer(initialState, action);
    expect(result.time.remaining).toEqual(9);
    expect(result.time.elapsed).toEqual(11);
  });

  it("Resets the time remaining", () => {
    initialState.time = { ...initialState.time, remaining: 10, duration: 100 };

    const action = { type: "RESET_TIMER" };
    const result = appReducer(initialState, action);
    expect(result.time.remaining).toEqual(100);
  });

  it("Toggles the running state", () => {
    initialState.time = { ...initialState.time, running: false };

    const action = { type: "TOGGLE_TIMER" };
    const result = appReducer(initialState, action);
    expect(result.time.running).toEqual(true);
    const result2 = appReducer(result, action);
    expect(result2.time.running).toEqual(false);
  });

  it("Sets the duration and remaining (if less than remaining", () => {
    initialState.time = {
      ...initialState.time,
      duration: 1000,
      remaining: 1000,
    };

    const action = { type: "SET_DURATION", payload: 200 };
    const result = appReducer(initialState, action);
    expect(result.time.duration).toEqual(200);
    expect(result.time.remaining).toEqual(200);
  });

  it("Sets the duration and not remaining (if more than remaining", () => {
    initialState.time = {
      ...initialState.time,
      duration: 1000,
      remaining: 100,
    };

    const action = { type: "SET_DURATION", payload: 200 };
    const result = appReducer(initialState, action);
    expect(result.time.duration).toEqual(200);
    expect(result.time.remaining).toEqual(100);
  });

  it("It adds two extra minutes", () => {
    initialState.time = { ...initialState.time, remaining: 100 };

    const action = { type: "ADD_TWO_MINUTES" };
    const result = appReducer(initialState, action);
    expect(result.time.remaining).toEqual(220);
  });
});
