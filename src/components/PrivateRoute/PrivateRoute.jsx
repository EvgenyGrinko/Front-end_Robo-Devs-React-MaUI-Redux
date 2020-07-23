import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const { component: Component, isLoggedIn, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
