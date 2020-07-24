import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    dispaly: "flex",
  },
}));

function DescriptionField(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.leftPane}></div>
      <div className={classes.rightPane}></div>
      <Typography color="primary" variant="h4" display="inline">
        {props.title}:
      </Typography>{" "}
      <Typography variant="h5" display="inline">
        {props.description}
      </Typography>
    </div>
  );
}

export default DescriptionField;
