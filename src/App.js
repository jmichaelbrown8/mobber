import React from "react";
// import { Timer } from "./features/timer/Timeer";
import { Mob } from "./view/Mob";
import { Summary } from "./view/Summary";
import { Box } from "@mui/system";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* <header className="App-header"></header> */}

        {/* <Timer /> */}
        <Mob />
        <Summary />
      </Box>
    </div>
  );
}

export default App;
