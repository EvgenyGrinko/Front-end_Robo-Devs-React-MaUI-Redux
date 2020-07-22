import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LogRegForm from "../LogRegForm/LogRegForm";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: `no-repeat url(https://robohash.org/${Math.random()}?set=set2)`,
    backgroundPosition: "left 40% top 40%",
    display: "flex",
    justifyContent: "flex-end",

  },
  content: {
  },
}));

function WelcomePage() {
  const [isLoginVisible, setLoginVisibility] = useState(true);
  const classes = useStyles();
  function handleLoginVisibility(){
    setLoginVisibility(false);
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {isLoginVisible ? (
          <LogRegForm
            header="Login"
            textfields="Email Password"
            notRegistered={true}
            setLoginVisibility={handleLoginVisibility}
          />
        ) : (
          <LogRegForm
            header="Register"
            textfields="Name Email Password"
          />
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
