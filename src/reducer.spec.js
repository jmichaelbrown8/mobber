import reducer from "./reducer";

test("Adds a member of the mob", () => {
  const initialState = [{ mob: ["Claire"] }];

  const action = { type: "ADD_MEMBER", payload: "J" };
  const result = reducer(initialState, action);
  expect(result.mob.length).toBe(2);
});
