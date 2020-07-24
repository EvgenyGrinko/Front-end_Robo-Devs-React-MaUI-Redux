import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getOneDeveloper, editDeveloper } from "../../redux/actions/index";
import DialogSuccess from "../DialogSuccess/DialogSuccess";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  avatar: {
    maxWidth: "100%",
    height: "auto",
    border: "1px solid #0d47a1",
    borderRadius: theme.spacing(2),
  },
  container: {
    display: "flex",
    minWidth: "450px",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      width: 300,
      height: 700,
    },
    [theme.breakpoints.up("sm")]: {
      width: 600,
      height: 450,
    },
    [theme.breakpoints.up("md")]: {
      width: 800,
      height: 450,
    },
    [theme.breakpoints.up("lg")]: {
      width: 900,
      height: 500,
    },
  },
  // mutableData: {
  //   // width: 400,
  //   padding: theme.spacing(2),
  //   height: "100%",
  // },
  submitData: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    justifyContent: "space-between",
    height: "100%",
  },
}));

function DeveloperInfo(props) {
  const id = props.match.params.id;

  useEffect(() => {
    props.getOneDeveloper(id);
  }, []);

  const {
    currentDeveloper: { developer, success },
  } = props;

  const [edittedDeveloper, setEdittedDeveloper] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });

  const [isEditDeveloper, setIsEditDeveloper] = useState(false);

  const [successDialogOpened, setsuccessDialogVisibility] = useState(false);

  function handleSuccessDialogClose() {
    setsuccessDialogVisibility(false);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setEdittedDeveloper((prevValues) => {
      return Object.fromEntries(
        Object.entries(prevValues).map(([key, prevValue]) => {
          if (key === name) return [key, value];
          if (!prevValue) return [key, developer[key]];
          else return [key, prevValue];
        })
      );
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.editDeveloper(edittedDeveloper, id);
    setsuccessDialogVisibility(true);
  }
  const classes = useStyles();
  return (
    <div>
      {success ? (
        <Paper className={classes.container} elevation={3}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6}>
              <img
                src={developer.avatar}
                className={classes.avatar}
                alt="Developer avatar"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <form
                action="PATCH"
                onSubmit={handleSubmit}
                className={classes.submitData}
              >
                <TextField
                  label="Name"
                  name="name"
                  defaultValue={developer.name}
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  label="Username"
                  name="username"
                  defaultValue={developer.username}
                  onChange={handleChange}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  defaultValue={developer.phone}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  defaultValue={developer.email}
                  onChange={handleChange}
                />
                <Button type="submit">Submit changes</Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <LoadingSpinner />
      )}
      <DialogSuccess
        title={props.error ? `${props.error}` : "Developer eddited nicely"}
        open={successDialogOpened}
        onClose={handleSuccessDialogClose}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return { currentDeveloper: state.currentDeveloper, error: state.error };
}

const mapDispatchToProps = { getOneDeveloper, editDeveloper };

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperInfo);
