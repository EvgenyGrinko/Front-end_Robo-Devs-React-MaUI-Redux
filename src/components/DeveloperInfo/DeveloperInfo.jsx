import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  IconButton,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getOneDeveloper, editDeveloper } from "../../redux/actions/index";
import DialogSuccess from "../dialogs/DialogSuccessDelete/DialogSuccessDelete";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import DescriptionField from "../DescriptionField/DescriptionField";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    marginTop: theme.spacing(10),
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
  submitData: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    justifyContent: "space-between",
    height: "100%",
  },
  rightPane: {
    display: "flex",
    flexDirection: "column",
  },
  description: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  description__content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: theme.spacing(1),
  },
  description__leftPane: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  description__rightPane: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  editButton: {
    alignSelf: "flex-end",
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
    setIsEditDeveloper(false);
  }

  function handleEditClick() {
    setIsEditDeveloper((prevValue) => !prevValue);
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
              <div className={classes.rightPane}>
                {isEditDeveloper ? (
                  <div className={classes.description}>
                    <IconButton
                      onClick={handleEditClick}
                      className={classes.editButton}
                    >
                      <ArrowBackIcon />
                    </IconButton>
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
                  </div>
                ) : (
                  <div className={classes.description}>
                    {/* <Link
                      to={`/api/edit/${developer._id}`}
                      className={classes.editButton}
                    > */}
                    <IconButton
                      onClick={handleEditClick}
                      className={classes.editButton}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* </Link> */}
                    <div className={classes.description__content}>
                      <div className={classes.description__leftPane}>
                        <Typography
                          color="primary"
                          variant="h6"
                          display="inline"
                        >
                          Name:
                        </Typography>
                        <Typography
                          color="primary"
                          variant="h6"
                          display="inline"
                        >
                          Username:
                        </Typography>
                        <Typography
                          color="primary"
                          variant="h6"
                          display="inline"
                        >
                          Phone:
                        </Typography>
                        <Typography
                          color="primary"
                          variant="h6"
                          display="inline"
                        >
                          Email:
                        </Typography>
                      </div>
                      <div className={classes.description__rightPane}>
                        <Typography variant="h6" display="inline">
                          {developer.name}
                        </Typography>
                        <Typography variant="h6" display="inline">
                          {developer.username}
                        </Typography>
                        <Typography variant="h6" display="inline">
                          {developer.phone}
                        </Typography>
                        <Typography variant="h6" display="inline">
                          {developer.email}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
