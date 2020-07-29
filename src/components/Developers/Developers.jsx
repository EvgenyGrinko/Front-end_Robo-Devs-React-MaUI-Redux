import React, { useEffect, useState } from "react";
import DevCard from "../DevCard/DevCard";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  // getAllDevelopers,
  findDevelopers,
  getFewDevelopers,
} from "../../redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import AddButton from "../AddButton/AddButton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import NotificationMessage from "../NotificationMessage/NotificationMessage";
// import PaginationBlock from "../PaginationBlock/PaginationBlock";

const useStyles = makeStyles((theme) => ({
  seachAddContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0, 1, 0),
  },
  itemsContainer: {
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(1),
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: 800,
    },
    [theme.breakpoints.up("md")]: {
      width: 900,
    },
    [theme.breakpoints.up("lg")]: {
      width: 1200,
    },
  },
  buttonShowMore: {
    margin: theme.spacing(2, 0),
  },
  noDevsFoundBlock: {
    position: "absolute",
    top: "50vh",
    left: "50vw",
    color: "grey",
  },
}));

const Developers = (props) => {
  const {
    // developers,
    fewDevelopers,
    // getAllDevelopers,
    isDevelopersLoaded,
    getFewDevelopers,
    findDevelopers,
  } = props;
  const [numberElementsToShow, setNumberElementsToShow] = useState(6);
  const numberShowMore = 6;
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
  const [notificationVisibility, setNotificationVisibility] = useState(false);

  useEffect(() => {
    getFewDevelopers(
      numberElementsToShow,
      isInitialDataLoaded
    );

    // getAllDevelopers();
  }, [getFewDevelopers, numberElementsToShow, isInitialDataLoaded]);
  function onSearch(searchedWord) {
    // setTimeout(() => {
    findDevelopers(searchedWord);
    setIsInitialDataLoaded(true);
    // }, 1000);
  }
  const classes = useStyles();

  function handleShowMore() {
    setNumberElementsToShow((prevValue) => prevValue + numberShowMore);
    setIsInitialDataLoaded(true);
  }

  function handleDelete() {
    setNotificationVisibility(false);
    setTimeout(() => {
      setNotificationVisibility(true);
    }, 150);
  }
  const handleDialogClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationVisibility(false);
  };

  return (
    <div>
      {isDevelopersLoaded ? (
        <Grid container>
          <Grid item={true} xs={false} sm={2} />
          <Grid container item={true} spacing={2} xs={12} sm={8}>
            <Grid item={true} xs={12}>
              <div className={classes.seachAddContainer}>
                <SearchBar onSearch={onSearch} />
                <Link to="/api/add">
                  <AddButton />
                </Link>
              </div>
            </Grid>

            <Grid
              container
              item={true}
              spacing={3}
              className={classes.itemsContainer}
            >
              {fewDevelopers.length ? (
                fewDevelopers.map((item, index) => {
                  if (index <= numberElementsToShow - 1)
                    return (
                      <Grid key={index} item={true} xs={12} sm={6} md={4}>
                        <DevCard
                          info={item}
                          component="form"
                          onDelete={handleDelete}
                        />
                      </Grid>
                    );
                  else return null;
                })
              ) : (
                <div className={classes.noDevsFoundBlock}>
                  No developers found
                </div>
              )}

              {numberElementsToShow <= fewDevelopers.length ? (
                <Button
                  className={classes.buttonShowMore}
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  onClick={handleShowMore}
                >
                  show more
                </Button>
              ) : null}
              {/* <PaginationBlock /> */}
            </Grid>
          </Grid>
          <Grid item={true} xs={false} sm={2} />
          <NotificationMessage
            visibility={notificationVisibility}
            handleClick={handleDialogClose}
            message="Developer deleted"
          />
        </Grid>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

const mapDispatchToProps = {
  // getAllDevelopers,
  findDevelopers,
  getFewDevelopers,
};
function mapStateToProps(state) {
  return {
    developers: state.developers,
    isDevelopersLoaded: state.isDevelopersLoaded,
    fewDevelopers: state.fewDevelopers,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Developers);
