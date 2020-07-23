import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function LoadingSpinner() {
  const classes = useStyles();
  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress />
    </div>
  );
}

export default LoadingSpinner;
