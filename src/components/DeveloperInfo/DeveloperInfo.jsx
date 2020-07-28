import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Grid, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { getOneDeveloper, editDeveloper } from "../../redux/actions/index";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeveloperForm from "../DeveloperForm/DeveloperForm";
import NotificationMessage from "../NotificationMessage/NotificationMessage";

const useStyles = makeStyles((theme) => ({
  avatar: {
    border: "1px solid #0d47a1",
    borderRadius: theme.spacing(2),
  },
  container: {
    display: "flex",
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
    flexGrow: 1,
  },
  editButton: {
    alignSelf: "flex-end",
  },
}));

function DeveloperInfo(props) {
  const id = props.match.params.id;
  const {
    currentDeveloper: { developer, success },
    getOneDeveloper,
  } = props;

  useEffect(() => {
    getOneDeveloper(id);
  }, [getOneDeveloper, id]);

  const [isEditDeveloper, setIsEditDeveloper] = useState(false);

  const [notificationVisibility, setNotificationVisibility] = useState(false);

  function handleSubmit(developer) {
    props.editDeveloper(developer, id);
  }

  const handleDialogClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationVisibility(false);
  };

  function handleEditClick() {
    setIsEditDeveloper((prevValue) => !prevValue);
  }
  function handleBackIcon() {
    props.getOneDeveloper(id);
    setIsEditDeveloper((prevValue) => !prevValue);
    handleDialogClose();
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
                      onClick={handleBackIcon}
                      className={classes.editButton}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <DeveloperForm
                      id={id}
                      onSubmit={handleSubmit}
                      initialDeveloper={{
                        name: developer.name,
                        email: developer.email,
                        username: developer.username,
                        phone: developer.phone,
                      }}
                      type="edit"
                      onEditSetSuccessDialogVisibility={
                        setNotificationVisibility
                      }
                    />
                  </div>
                ) : (
                  <div className={classes.description}>
                    <IconButton
                      onClick={handleEditClick}
                      className={classes.editButton}
                    >
                      <EditIcon />
                    </IconButton>
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
              <NotificationMessage
                visibility={notificationVisibility}
                handleClick={handleDialogClose}
                message="Developer eddited successfully"
              />
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { currentDeveloper: state.currentDeveloper, error: state.error };
}

const mapDispatchToProps = { getOneDeveloper, editDeveloper };

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperInfo);
