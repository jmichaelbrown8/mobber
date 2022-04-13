import { AppBar, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Mobber
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
