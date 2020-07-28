import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Paper,
  Typography,
  CircularProgress,
  Container,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { getOneDeveloper } from "../../redux/actions/index";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    alignSelf: "center",
    padding: theme.spacing(0, 5, 0, 0),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    width: theme.spacing(50),
    height: theme.spacing(50),
    padding: theme.spacing(2, 2, 2, 5),
  },
  content: {
    display: "flex",
    padding: theme.spacing(10, 0, 0, 0),
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    padding: theme.spacing(0, 0, 3, 0),
  },
  textHeader: {
    fontWeight: 800,
  },
  editButton: {
    alignSelf: "flex-end",
  },
}));

const DevInfo = (props) => {
  const id = props.match.params.id;
  const {
    currentDeveloper: { developer, success },
  } = props;

  useEffect(() => {
    props.getOneDeveloper(id);
  }, []);

  const classes = useStyles();
  return (
    <div>
      {success ? (
        <div className={classes.content}>
          <Paper elevation={3} className={classes.paper}>
            <Link
              to={`/api/edit/${developer._id}`}
              className={classes.editButton}
            >
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>

            <Container className={classes.textContainer}>
              <Avatar className={classes.avatar} src={developer.avatar} />

              <Typography className={classes.text}>
                <span className={classes.textHeader}>email: </span>
                {developer.email}
              </Typography>
              <Typography className={classes.text}>
                <span className={classes.textHeader}>name: </span>
                {developer.name}
              </Typography>
              <Typography className={classes.text}>
                <span className={classes.textHeader}>phone: </span>
                {developer.phone}
              </Typography>
              <Typography className={classes.text}>
                <span className={classes.textHeader}>username: </span>
                {developer.username}
              </Typography>
            </Container>
          </Paper>
        </div>
      ) : (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = { getOneDeveloper };
function mapStateToProps(state) {
  return { currentDeveloper: state.currentDeveloper };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevInfo);
