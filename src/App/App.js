import React from "react";
import "./App.css";
import NavBar from "../components/NavBar/NavBar";
import { Grid } from "@material-ui/core";
import Developers from "../components/Developers/Developers";
import DevInfo from "../components/DevInfo/DevInfo";
import EditDeveloper from "../components/EditDeveloper/EditDeveloper";
import Projects from "../components/Projects/Projects";
import AddNewDeveloperForm from "../components/AddNewDeveloperForm/AddNewDeveloperForm";
import { Switch, Route } from "react-router-dom";
import WelcomePage from "../components/WelcomePage/WelcomePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <WelcomePage />
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

//https://jsonplaceholder.typicode.com/users
//https://robohash.org/

export default App;
