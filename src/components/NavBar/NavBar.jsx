import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ToysIcon from "@material-ui/icons/Toys";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  function handleLogout() {
    localStorage.removeItem("token");
    document.location.reload(true);
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ToysIcon />
        </IconButton>
        <Link to="/api/developers">
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/projects">
          <Button color="inherit">Projects</Button>
        </Link>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}