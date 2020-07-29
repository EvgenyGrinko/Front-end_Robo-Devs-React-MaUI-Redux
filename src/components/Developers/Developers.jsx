import React, { useEffect, useState } from "react";
import DevCard from "../DevCard/DevCard";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllDevelopers, findDevelopers } from "../../redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import AddButton from "../AddButton/AddButton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
}));

const Developers = (props) => {
  const { developers, getAllDevelopers, developersLoaded } = props;
  const [numberElementsToShow, setNumberElementsToShow] = useState(6);
  useEffect(() => {
    getAllDevelopers();
  }, [getAllDevelopers]);
  function onSearch(searchedWord) {
    // setTimeout(() => {
      props.findDevelopers(searchedWord);
    // }, 1000);
  }

  const classes = useStyles();

  function handleShowMore() {
    setNumberElementsToShow((prevValue) => prevValue + 6);
  }

  return (
    <div>
      {developersLoaded ? (
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
              {developers.length ? (
                developers.map((item, index) => {
                  if (index <= numberElementsToShow - 1)
                    return (
                      <Grid key={index} item={true} xs={12} sm={6} md={4}>
                        <DevCard info={item} component="form" />
                      </Grid>
                    );
                  else return null;
                })
              ) : (
                <div>No developers found</div>
              )}
              {numberElementsToShow <= developers.length ? (
                <Button
                  className={classes.buttonShowMore}
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  onClick={handleShowMore}
                >
                  show 6 more
                </Button>
              ) : null}
            </Grid>
          </Grid>
          <Grid item={true} xs={false} sm={2} />
        </Grid>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

const mapDispatchToProps = {
  getAllDevelopers,
  findDevelopers,
};
function mapStateToProps(state) {
  return {
    developers: state.developers,
    developersLoaded: state.developersLoaded,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Developers);
