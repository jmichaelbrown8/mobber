import React, { useState } from "react";
import { useSelector } from "react-redux";
import store from "../store";
import shuffleArray from "../utils/shuffleArray";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

interface MobState {
  mob: string[];
}

export const Mob = () => {
  const mob = useSelector((state: MobState) => state.mob);
  const [userInput, setUserInput] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    store.dispatch({ type: "ADD_MEMBER", payload: userInput });
    setUserInput("");
  };

  const getRole = (i) => {
    switch (i) {
      case 0:
        return "Driver";
      case 1:
        return "Navigator";
      default:
        return "Mobber";
    }
  };

  const getNextDriver = () => {
    if (!mob.length) return "";
    return mob[mob.length - 1];
  };
  const getNextNavigator = () => {
    if (!mob.length) return "";
    return mob[0];
  };

  const shuffleMembers = () => {
    const newOrder = shuffleArray(mob);
    store.dispatch({ type: "SET_MEMBERS", payload: newOrder });
  };

  return (
    <Container component="main" sx={{ my: 2 }} maxWidth="xs">
      <Box
        onSubmit={addUser}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* List out the existing mob members */}
        {mob.map((mobber, i) => {
          return (
            <div key={mobber + i}>
              {/* If the first member, show the next driver */}
              {i === 0 ? (
                <Typography variant="subtitle1" color="primary">
                  Next Driver: {getNextDriver()}
                </Typography>
              ) : (
                ""
              )}

              {/* If the second member, show the next navigator */}
              {i === 1 ? (
                <Typography variant="subtitle1" color="secondary">
                  Next Navigator: {getNextNavigator()}
                </Typography>
              ) : (
                ""
              )}

              {/* If the third member, show the mobber subtitle */}
              {i === 2 ? (
                <Typography variant="subtitle1" color="error">
                  Mobbers:
                </Typography>
              ) : (
                ""
              )}
              <TextField
                label={getRole(i)}
                variant="outlined"
                value={mobber}
                color={i === 0 ? "primary" : i === 1 ? "secondary" : "error"}
                focused
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Remove member">
                        <IconButton
                          onClick={() =>
                            store.dispatch({
                              type: "REMOVE_MEMBER",
                              payload: i,
                            })
                          }
                          color="error"
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          );
        })}

        {/* New member input area */}
        <TextField
          label="Add member"
          variant="outlined"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" color="success">
                  <AddCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box>
        <Tooltip title="Rotate roles">
          <IconButton
            onClick={() => {
              store.dispatch({ type: "ROTATE_MEMBERS" });
            }}
          >
            <RotateRightIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Shuffle order">
          <IconButton onClick={shuffleMembers}>
            <ShuffleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  );
};
