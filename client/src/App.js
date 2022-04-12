import React from "react";
// import { Timer } from "./features/timer/Timeer";
import { Mob } from "./Mob";
import { Summary } from "./Summary";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Timer /> */}
        <Mob />
        <Summary />
      </header>
    </div>
  );
}

export default App;
