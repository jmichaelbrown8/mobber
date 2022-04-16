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
  const { remaining, running, duration, elapsed, timerStarted } = useSelector(
    (state) => state.time
  );
  const [percent, setPercent] = useState(100);
  const [currentRemaining, setCurrentRemaining] = useState(remaining);
  const [currentElapsed, setCurrentElapsed] = useState(elapsed);

  useEffect(() => {
    if (!running) return;

    if (!timerStarted) {
      console.log("no timer");
      return;
    }

    const timerId = setInterval(() => {
      // store.dispatch({ type: "DECREMENT_TIMER" });
      // instead of decrementing the timer, which is dependent
      // on javascript to be executing in the foreground, we're
      // going to calculate time remaining and elapsed
      const now = Date.now();
      // The ~ is a bitwise operator, so doubling it effectively
      // floors the number faster than Math.floor() would!
      const difference = ~~((now - timerStarted) / 1000);
      setCurrentRemaining(currentRemaining - difference);
      setCurrentElapsed(currentElapsed + difference);
      // console.log({ difference, calcRemaining });
    }, 100);

    return () => {
      const now = Date.now();
      const difference = ~~((now - timerStarted) / 1000);

      store.dispatch({
        type: "SET_TIME",
        payload: {
          remaining: remaining - difference,
          elapsed: elapsed + difference,
        },
      });
      clearInterval(timerId);
    };
    // intentionally only affected by "running" state so it doesn't
    // reset "now" variable in effect above which would cause timer drift
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, timerStarted]);

  useEffect(() => {
    setPercent((currentRemaining / duration) * 100);
  }, [currentRemaining, duration]);

  // Passes the elapsed time up a level so we don't create a nasty loop
  useEffect(() => {
    store.dispatch({
      type: "SET_ELAPSED",
      payload: currentElapsed,
    });
  }, [currentElapsed]);

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
          color={currentRemaining < 120 ? "error" : "primary"}
        />
        <Typography variant="h6">
          {formatTime(currentRemaining)} / {formatTime(duration)} |{" "}
          {formatTime(currentElapsed)}
        </Typography>

        <Box>
          <Tooltip title={running ? "Pause timer" : "Start timer"}>
            <IconButton
              onClick={() => {
                store.dispatch({
                  type: "TOGGLE_TIMER",
                  payload: Date.now(),
                });
              }}
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
