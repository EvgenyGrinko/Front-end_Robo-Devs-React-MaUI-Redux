import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "../components/NavBar/NavBar";
import { Grid } from "@material-ui/core";
import Developers from "../components/Developers/Developers";
import DevInfo from "../components/DevInfo/DevInfo";
import EditDeveloper from "../components/EditDeveloper/EditDeveloper";
import Projects from "../components/Projects/Projects";
import AddNewDeveloperForm from "../components/AddNewDeveloperForm/AddNewDeveloperForm";
import { Switch, Route, Redirect } from "react-router-dom";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { connect } from "react-redux";
import { compareToken } from "../redux/actions/index";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

function App(props) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    props.compareToken({ token: localStorage.getItem("token") });
    setIsPageLoaded(true);
  }, []);
  const { isLoggedIn } = props;
  return (
    <div className="App">
      {!isPageLoaded ? (
        <LoadingSpinner />
      ) : (
        <Switch>
          {!isLoggedIn ? (
            <Route exact path="/" component={WelcomePage} />
          ) : (
            <Grid container direction="column">
              <Grid item={true} xs={12}>
                <NavBar />
              </Grid>
              <Grid item={true} container>
                <Grid item={true} xs={false} sm={2} />
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
                  component={DevInfo}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  exact
                  path="/api/edit/:id"
                  component={EditDeveloper}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  exact
                  path="/api/add"
                  component={AddNewDeveloperForm}
                />

                <Grid item={true} xs={false} sm={2} />
              </Grid>
            </Grid>
          )}
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn };
};

const mapDispatchToProps = { compareToken };

export default connect(mapStateToProps, mapDispatchToProps)(App);

//https://jsonplaceholder.typicode.com/users
//https://robohash.org/
