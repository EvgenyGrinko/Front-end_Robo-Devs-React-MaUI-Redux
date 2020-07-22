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
import { Link } from "react-router-dom";

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

  function handleSubmit(event) {
    event.preventDefault();
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
              {props.textfields.split(" ").map((item) => {
                return (
                  <TextField label={item} className={classes.inputBlock} />
                );
              })}
              {props.notRegistered ? (
                // <Link to="/user/register">
                <Typography
                  align="left"
                  variant="caption"
                  color="textSecondary"
                  className={classes.notRegText}
                  onClick={() => {
                    props.setLoginVisibility();
                  }}
                >
                  Not registered yet?
                </Typography>
              ) : // </Link>
              null}
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

export default LogRegForm;
