import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RestoreIcon from "@mui/icons-material/Restore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useSelector } from "react-redux";
import store from "../store";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  LinearProgress,
  Container,
} from "@mui/material";
import formatTime from "../utils/formatTime";

const pulseStyle = {
  animation: "pulse infinite 2s linear",
  "@keyframes pulse": {
    from: {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
    to: {
      opacity: 1,
    },
  },
};

export function Timer() {
  const { remaining, running, duration } = useSelector((state) => state.time);
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    if (!running) return;
    const timerId = setInterval(() => {
      store.dispatch({ type: "DECREMENT_TIMER" });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [running]);

  useEffect(() => {
    setPercent((remaining / duration) * 100);
  }, [remaining, duration]);

  return (
    <Card
      elevation={1}
      sx={{ display: "grid", justifyItems: "center", pt: 4, pb: 2 }}
    >
      <Container maxWidth="xs">
        <LinearProgress
          sx={running ? pulseStyle : {}}
          value={percent}
          variant="determinate"
          color={remaining < 120 ? "error" : "primary"}
        />
        <Typography variant="h6">
          {formatTime(remaining)} / {formatTime(duration)}
        </Typography>
      </Container>
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
