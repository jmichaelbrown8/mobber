import React from "react";
import { Header } from "./view/Header";
import { Timer } from "./view/Timer";
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
        <Header />

        <Timer />
        <Mob />
        <Summary />
      </Box>
    </div>
  );
}

export default App;
