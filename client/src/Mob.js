import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import store from "./store";

const selectMob = (state) => state.mob;

export function Mob() {
  const mob = useSelector(selectMob);
  // const state = store.getState();
  const [userInput, setUserInput] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    store.dispatch({ type: "ADD_MEMBER", payload: userInput });
    setUserInput("");
  };

  return (
    <div>
      {mob.map((mobber, i) => {
        return (
          <div key={mobber + i}>
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
