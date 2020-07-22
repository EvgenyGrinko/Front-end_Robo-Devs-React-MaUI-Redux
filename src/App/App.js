import React from "react";
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
import {connect} from 'react-redux';

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {props.token ? <Redirect to="/api/developers"/> : <WelcomePage />}
        </Route>
        <Grid container direction="column">
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item container>
            <Grid item xs={0} sm={2} />

            <Route exact path="/api/developers">
              <Developers />
            </Route>
            <Route path="/projects" component={Projects} />
            <Route exact path="/api/developers/:id" component={DevInfo} />
            <Route exact path="/api/edit/:id" component={EditDeveloper} />
            <Route exact path="/api/add" component={AddNewDeveloperForm} />

            <Grid item xs={0} sm={2} />
          </Grid>
        </Grid>
      </Switch>
    </div>
  );
}

function mapStateToProps(state){
  return {token: state.token}
}

export default connect(mapStateToProps)(App);

//https://jsonplaceholder.typicode.com/users
//https://robohash.org/
