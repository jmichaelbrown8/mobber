import formatTime from "./formatTime";

it("Handles all scope of positive and negative numbers appropriately", () => {
  expect(formatTime(-7260)).toBe("-2h 1m");
  expect(formatTime(-140)).toBe("-2m 20s");
  expect(formatTime(-40)).toBe("-40s");
  expect(formatTime(40)).toBe("40s");
  expect(formatTime(140)).toBe("2m 20s");
  expect(formatTime(600)).toBe("10m");
  expect(formatTime(7260)).toBe("2h 1m");
});
