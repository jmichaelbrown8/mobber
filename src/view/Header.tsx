import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Mobber
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
