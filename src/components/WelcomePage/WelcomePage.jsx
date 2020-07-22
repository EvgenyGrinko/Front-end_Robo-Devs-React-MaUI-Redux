import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LogRegForm from "../LogRegForm/LogRegForm";
import {connect} from 'react-redux';
import {registerUser} from '../../redux/actions/index'

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: `no-repeat url(https://robohash.org/${Math.random()}?set=set2)`,
    backgroundPosition: "left 40% top 40%",
    backgroundSize: '30%',
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {},
}));

function WelcomePage(props) {
  const [isLoginVisible, setLoginVisibility] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const classes = useStyles();

  function handleLoginVisibility(state) {
    setLoginVisibility(state);
  }

  function handleRegisterData(data){
    const {name, value} = data;
    setRegisterData((prevData)=>{
      return {...prevData, [name]: value}
    })
  }

  function handleSubmit(){
    props.registerUser(registerData)
  }

  function handleLoginData(data){
    setLoginData(data)
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
            onChange={handleLoginData}
            onSubmit={handleSubmit}
          />
        ) : (
          <LogRegForm
            header="Register"
            textfields="Name Email Password"
            setLoginVisibility={handleLoginVisibility}
            onChange={handleRegisterData}
            notRegistered={false}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = {registerUser}

export default connect(null, mapDispatchToProps)(WelcomePage);
