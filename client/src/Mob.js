import React, { useState } from "react";
import { useSelector } from "react-redux";
import store from "./store";

export function Mob() {
  const mob = useSelector((state) => state.mob);
  const [userInput, setUserInput] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    store.dispatch({ type: "ADD_MEMBER", payload: userInput });
    setUserInput("");
  };

  const getRole = (i) => {
    switch (i) {
      case 0:
        return "Driver";
      case 1:
        return "Navigator";
      default:
        return "Mobber";
    }
  };

  const getNextDriver = () => {
    if (!mob.length) return "";
    return mob[mob.length - 1];
  };
  const getNextNavigator = () => {
    if (!mob.length) return "";
    return mob[0];
  };

  return (
    <div>
      {mob.map((mobber, i) => {
        return (
          <div key={mobber + i}>
            {i === 0 ? <div>Next Driver: {getNextDriver()}</div> : ""}
            {i === 1 ? <div>Next Navigator: {getNextNavigator()}</div> : ""}
            <label>{getRole(i)}</label>
            <input type="text" value={mobber} disabled />
            <button
              type="button"
              onClick={() =>
                store.dispatch({ type: "REMOVE_MEMBER", payload: i })
              }
            >
              x
            </button>
          </div>
        );
      })}
      <form onSubmit={addUser}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}
