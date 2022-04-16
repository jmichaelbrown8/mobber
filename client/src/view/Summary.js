import { Box, Container, Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import formatTime from "../utils/formatTime";

export function Summary() {
  const {
    rotations,
    time: { elapsed },
  } = useSelector((state) => state);
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Rotations: {rotations} | Elapsed: {formatTime(elapsed)}
        </Typography>
        <span>
          {"Copyright © "}
          {new Date().getFullYear()}{" "}
          <Link color="inherit" href="https://github.com/jmichaelbrown8/mobber">
            Mobber
          </Link>{" "}
        </span>
      </Container>
    </Box>
  );
}
