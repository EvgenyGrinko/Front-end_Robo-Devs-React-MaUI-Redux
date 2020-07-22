import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "1rem",
    padding: theme.spacing(1),
    width: "3rem",
    height: "3rem",
  },
}));

function AddButton() {
  const classes = useStyles();
  return (
    <Button className={classes.button}>
      <PersonAddIcon />
    </Button>
  );
}

export default AddButton;
