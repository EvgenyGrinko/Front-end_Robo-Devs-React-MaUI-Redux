import React, { useEffect } from "react";
import DevCard from "../DevCard/DevCard";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllDevelopers, findDevelopers } from "../../redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import AddButton from "../AddButton/AddButton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  seachAddContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0, 1, 0),
  },
  spinnerContainer: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemsContainer: {
    [theme.breakpoints.up("xs")]: {
      width: 300,
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
}));

const Developers = (props) => {
  const { developers, getAllDevelopers } = props;
  useEffect(() => {
    getAllDevelopers();
  }, [getAllDevelopers]);
  function onSearch(searchedWord) {
    setTimeout(() => {
      props.findDevelopers(searchedWord);
    }, 1000);
  }

  const classes = useStyles();

  return (
    <div>
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
                return (
                  <Grid key={index} item={true} xs={12} sm={6} md={4}>
                    <DevCard info={item} component="form" />
                  </Grid>
                );
              })
            ) : (
              <div>No developers found</div>
            )}
          </Grid>
        </Grid>
        <Grid item={true} xs={false} sm={2} />
      </Grid>
    </div>
  );
};

const mapDispatchToProps = {
  getAllDevelopers,
  findDevelopers,
};
function mapStateToProps(state) {
  return { developers: state.developers };
}

export default connect(mapStateToProps, mapDispatchToProps)(Developers);
