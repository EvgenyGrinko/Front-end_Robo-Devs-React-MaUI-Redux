import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    position: "absolute",
    top: "50vh",
    left: "50vw",
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
