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
  avatar: {},
  img: {
    width: "100%",
    height: "auto",
  },
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(10),
    [theme.breakpoints.up("xs")]: {
      width: 500,
      height: 900,
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      width: 650,
      height: 400,
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      width: 800,
      height: 450,
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      width: 900,
      height: 500,
      padding: theme.spacing(3),
    },
  },
  rightPane: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  navButton: {
    textAlign: "right",
    width: "100%",
  },
  description: {
    height: "100%",
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.up("xs")]: {
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(6),
    },
  },
  description__content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  description__block: {
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textHeader: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.3rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.7rem",
    },
  },
  textContent: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.3rem",
    },
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

  const handleNotificationClose = (event, reason) => {
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
    handleNotificationClose();
  }
  const classes = useStyles();
  return (
    <div>
      {success ? (
        <Paper className={classes.container} elevation={3}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6}>
              <div className={classes.avatar}>
                <img
                  className={classes.img}
                  src={developer.avatar}
                  alt="Developer avatar"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className={classes.rightPane}>
                {isEditDeveloper ? (
                  <div className={classes.description}>
                    <div className={classes.navButton}>
                      <IconButton onClick={handleBackIcon}>
                        <ArrowBackIcon />
                      </IconButton>
                    </div>

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
                    <div className={classes.navButton}>
                      <IconButton
                        onClick={handleEditClick}
                        className={classes.editButton}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>

                    <div className={classes.description__content}>
                      <div className={classes.description__block}>
                        <Typography
                          color="primary"
                          className={classes.textHeader}
                          display="inline"
                        >
                          Name:
                        </Typography>

                        <Typography
                          className={classes.textContent}
                          display="inline"
                        >
                          {developer.name}
                        </Typography>
                      </div>
                      <div className={classes.description__block}>
                        <Typography
                          color="primary"
                          className={classes.textHeader}
                          display="inline"
                        >
                          Username:
                        </Typography>

                        <Typography
                          className={classes.textContent}
                          display="inline"
                        >
                          {developer.username}
                        </Typography>
                      </div>
                      <div className={classes.description__block}>
                        <Typography
                          color="primary"
                          className={classes.textHeader}
                          display="inline"
                        >
                          Phone:
                        </Typography>

                        <Typography
                          className={classes.textContent}
                          display="inline"
                        >
                          {developer.phone}
                        </Typography>
                      </div>
                      <div className={classes.description__block}>
                        <Typography
                          color="primary"
                          className={classes.textHeader}
                          display="inline"
                        >
                          Email:
                        </Typography>

                        <Typography
                          className={classes.textContent}
                          display="inline"
                        >
                          {developer.email}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <NotificationMessage
                visibility={notificationVisibility}
                handleClick={handleNotificationClose}
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
