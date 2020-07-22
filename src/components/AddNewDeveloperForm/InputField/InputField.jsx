import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 0, 2, 0),
    width: "inherit",
  },
}));

function InputField(props) {
  const classes = useStyles();

  function handleChange(event) {
    props.onChange(event.target);
  }
  return (
    <div className={classes.container}>
      <TextField
        fullWidth={true}
        label={props.name[0].toUpperCase() + props.name.slice(1)}
        variant="outlined"
        id={props.name.toLowerCase()}
        name={props.name}
        onChange={handleChange}
        value={props.value}
        required={props.isRequired}
        type={props.type}
      />
    </div>
  );
}

export default InputField;
