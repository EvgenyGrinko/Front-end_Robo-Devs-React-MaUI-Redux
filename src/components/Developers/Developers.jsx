import React, { useEffect, useState } from "react";
import DevCard from "../DevCard/DevCard";
import { Grid, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllDevelopers, setSearchedWord } from "../../redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import AddButton from "../AddButton/AddButton";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";


const useStyles = makeStyles((theme) => ({
  seachAddContainer: {
    width: "100%",
    display: "flex",
    padding: theme.spacing(1, 0, 1, 0),
    alignItems: "center",
  },
  spinnerContainer: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Developers = (props) => {
  useEffect(() => {
    props.getAllDevelopers();
    setIsPageLoaded(true)
  }, []);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  function onSearch(searchedWord) {
    setTimeout(() => {
      props.setSearchedWord(searchedWord);
    }, 1000);
  }

  const classes = useStyles();

  return (
    <div>
      {!isPageLoaded ? (
        <LoadingSpinner/>
      ) : (
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
            {props.foundDevelopers.map((item, index) => {
              return (
                <Grid key={index} item={true} xs={12} sm={6} md={4}>
                  <DevCard info={item} component="form" />
                </Grid>
              );
            })}
          </Grid>
          <Grid item={true} xs={false} sm={2} />
        </Grid>
      )}
    </div>
  );
};

const mapDispatchToProps = { getAllDevelopers, setSearchedWord };
function mapStateToProps(state) {
  return { foundDevelopers: state.foundDevelopers, loading: state.loading };
}

export default connect(mapStateToProps, mapDispatchToProps)(Developers);
