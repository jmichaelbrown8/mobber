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
  const { remaining, running, duration, elapsed } = useSelector(
    (state) => state.time
  );
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    if (!running) return;
    const startTime = Date.now();
    const startRemaining = remaining;
    const startElapsed = elapsed;
    const timerId = setInterval(() => {
      // store.dispatch({ type: "DECREMENT_TIMER" });
      // instead of decrementing the timer, which is dependent
      // on javascript to be executing in the foreground, we're
      // going to calculate time remaining and elapsed
      const now = Date.now();
      // The ~ is a bitwise operator, so doubling it effectively
      // floors the number faster than Math.floor() would!
      const difference = ~~((now - startTime) / 1000);
      const calcRemaining = startRemaining - difference;
      const calcElapsed = startElapsed + difference;
      store.dispatch({
        type: "SET_TIME",
        payload: { remaining: calcRemaining, elapsed: calcElapsed },
      });
    }, 100);

    return () => {
      clearInterval(timerId);
    };
    // intentionally only affected by "running" state so it doesn't
    // reset "now" variable in effect above which would cause timer drift
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => {
    setPercent((remaining / duration) * 100);
  }, [remaining, duration]);

  return (
    <Card
      elevation={1}
      sx={{ display: "grid", justifyItems: "center", pt: 4, pb: 2 }}
      maxWidth="xs"
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
              {running ? (
                <PauseIcon fontSize="large" />
              ) : (
                <PlayArrowIcon fontSize="large" />
              )}
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
              <RestoreIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </Card>
  );
}
