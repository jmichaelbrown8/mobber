import reducer from "./reducer";

describe("Mob reducers", () => {
  it("Adds a member of the mob", () => {
    const initialState = { mob: ["Claire"] };

    const action = { type: "ADD_MEMBER", payload: "J" };
    const result = reducer(initialState, action);
    expect(result.mob).toEqual(["Claire", "J"]);
  });

  it("Removes a member of the mob", () => {
    const initialState = { mob: ["Claire", "J"] };

    const action = { type: "REMOVE_MEMBER", payload: 0 };
    const result = reducer(initialState, action);
    expect(result.mob).toEqual(["J"]);
  });

  it("Rotates the members of the mob", () => {
    const initialState = { mob: ["Claire", "J"] };

    const action = { type: "ROTATE_MEMBERS" };
    const result = reducer(initialState, action);
    expect(result.mob).toEqual(["J", "Claire"]);
  });

  it("Sets the members of the mob", () => {
    const initialState = { mob: [] };

    const action = { type: "SET_MEMBERS", payload: ["Claire", "J"] };
    const result = reducer(initialState, action);
    expect(result.mob).toEqual(["Claire", "J"]);
  });
});

describe("Time reducers", () => {
  it("Decrements the time remaining and increments the elapsed time", () => {
    const initialState = { time: { remaining: 10, elapsed: 10 } };

    const action = { type: "DECREMENT_TIMER" };
    const result = reducer(initialState, action);
    expect(result.time.remaining).toEqual(9);
    expect(result.time.elapsed).toEqual(11);
  });

  it("Resets the time remaining", () => {
    const initialState = { time: { remaining: 10, duration: 100 } };

    const action = { type: "RESET_TIMER" };
    const result = reducer(initialState, action);
    expect(result.time.remaining).toEqual(100);
  });

  it("Toggles the running state", () => {
    const initialState = { time: { running: false } };

    const action = { type: "TOGGLE_TIMER" };
    const result = reducer(initialState, action);
    expect(result.time.running).toEqual(true);
    const result2 = reducer(result, action);
    expect(result2.time.running).toEqual(false);
  });

  it("Sets the duration and remaining (if less than remaining", () => {
    const initialState = { time: { duration: 1000, remaining: 1000 } };

    const action = { type: "SET_DURATION", payload: 200 };
    const result = reducer(initialState, action);
    expect(result.time.duration).toEqual(200);
    expect(result.time.remaining).toEqual(200);
  });

  it("Sets the duration and not remaining (if more than remaining", () => {
    const initialState = { time: { duration: 1000, remaining: 100 } };

    const action = { type: "SET_DURATION", payload: 200 };
    const result = reducer(initialState, action);
    expect(result.time.duration).toEqual(200);
    expect(result.time.remaining).toEqual(100);
  });

  it("It adds two extra minutes", () => {
    const initialState = { time: { remaining: 100 } };

    const action = { type: "ADD_TWO_MINUTES" };
    const result = reducer(initialState, action);
    expect(result.time.remaining).toEqual(220);
  });
});
