// Could use LinearProgress or CircularProgress components from MUI: https://mui.com/material-ui/react-progress/

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RestoreIcon from "@mui/icons-material/Restore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useSelector } from "react-redux";
import store from "../store";
// import { useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import formatTime from "../utils/formatTime";

export function Timer() {
  const { remaining, running, duration } = useSelector((state) => state.time);

  return (
    <Card
      raised={false}
      sx={{ display: "grid", justifyItems: "center", py: "1rem" }}
    >
      <Box>
        <Typography variant="h6">
          {formatTime(remaining)} / {formatTime(duration)}
        </Typography>
      </Box>
      <Box>
        <Tooltip title={running ? "Pause timer" : "Start timer"}>
          <IconButton
            onClick={() =>
              store.dispatch({
                type: "TOGGLE_TIMER",
              })
            }
            color="primary"
          >
            {running ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset timer">
          <IconButton
            onClick={() =>
              store.dispatch({
                type: "RESET_TIMER",
              })
            }
            color="secondary"
          >
            <RestoreIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
