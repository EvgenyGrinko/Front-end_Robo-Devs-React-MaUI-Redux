import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    margin: theme.spacing(20, 20, 0, 0),
  },
  inputBlock: {
    padding: theme.spacing(0, 2, 2, 1),
  },
  notRegText: {
    "&:hover": {
      color: "#fb8c00",
      cursor: "pointer",
    },
  },
}));

function LogRegForm(props) {
  const classes = useStyles();

  function handleChange(event) {
    const { name, value } = event.target;
    props.onChange({ name: name, value: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit();
  }
  return (
    <div>
      <Paper elevation={3} className={classes.container}>
        <Container>
          <Typography color="primary" align="center" variant="h5">
            Welcome to lochalhost:3000
          </Typography>
          <Typography align="left" variant="h6">
            {props.header}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="flex-start" direction="column">
              {props.textfields.split(" ").map((item, id) => {
                return (
                  <TextField
                    key={id}
                    label={item}
                    error={props.error}
                    helperText={props.error ? "Please, check your entry" : null}
                    type={item.toLowerCase()}
                    required
                    name={item.toLowerCase()}
                    onChange={handleChange}
                    className={classes.inputBlock}
                  />
                );
              })}
              {props.notRegistered ? (
                <Typography
                  align="left"
                  variant="caption"
                  color="textSecondary"
                  className={classes.notRegText}
                  onClick={() => {
                    props.setLoginVisibility(false);
                  }}
                >
                  Not registered yet?
                </Typography>
              ) : (
                <Typography
                  align="left"
                  variant="caption"
                  color="textSecondary"
                  className={classes.notRegText}
                  onClick={() => {
                    props.setLoginVisibility(true);
                  }}
                >
                  Already registered?
                </Typography>
              )}
            </Grid>
            <Button
              type="submit"
              size="medium"
              style={{ backgroundColor: "#ffb74d" }}
            >
              Let's go
            </Button>
          </form>
        </Container>
      </Paper>
    </div>
  );
}

function mapStateToProps(state) {
  return { error: state.error };
}

export default connect(mapStateToProps)(LogRegForm);
