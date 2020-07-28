import React, { useEffect } from "react";
import "./App.css";
import NavBar from "../components/NavBar/NavBar";
import { Grid } from "@material-ui/core";
import Developers from "../components/Developers/Developers";
import Projects from "../components/Projects/Projects";
import AddNewDeveloperForm from "../components/AddNewDeveloperForm/AddNewDeveloperForm";
import { Switch, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { connect } from "react-redux";
import { compareToken } from "../redux/actions/index";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import DeveloperInfo from "../components/DeveloperInfo/DeveloperInfo";

function App(props) {
  const { isLoggedIn, isTokenCompared, compareToken } = props;

  useEffect(() => {
    compareToken({ token: localStorage.getItem("token") });
  }, [compareToken]);
  return (
    <div>
      {!isTokenCompared ? (
        <LoadingSpinner />
      ) : (
        <div className="App">
          <Switch>
            <React.Fragment>
              <Route exact path="/" component={WelcomePage} />
              <Grid container direction="column">
                <Grid item={true} xs={12}>
                  <NavBar />
                </Grid>

                <Grid
                  item={true}
                  container
                  style={{ height: "70vh" }}
                  justify="center"
                >
                  <PrivateRoute
                    isLoggedIn={isLoggedIn}
                    exact
                    path="/api/developers"
                    component={Developers}
                  />
                  <PrivateRoute
                    isLoggedIn={isLoggedIn}
                    exact
                    path="/projects"
                    component={Projects}
                  />
                  <PrivateRoute
                    isLoggedIn={isLoggedIn}
                    exact
                    path="/api/developers/:id"
                    component={DeveloperInfo}
                  />

                  <PrivateRoute
                    isLoggedIn={isLoggedIn}
                    exact
                    path="/api/add"
                    component={AddNewDeveloperForm}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          </Switch>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    isTokenCompared: state.isTokenCompared,
  };
};

const mapDispatchToProps = { compareToken };

export default connect(mapStateToProps, mapDispatchToProps)(App);

//https://jsonplaceholder.typicode.com/users
//https://robohash.org/
