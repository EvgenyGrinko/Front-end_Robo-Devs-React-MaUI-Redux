import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LogRegForm from "../LogRegForm/LogRegForm";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../redux/actions/index";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import NotificationMessage from "../NotificationMessage/NotificationMessage";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: `no-repeat url(https://robohash.org/${Math.random()}?set=set2)`,
    backgroundPosition: "left 40% top 40%",
    backgroundSize: "30%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const validationSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Please enter email address in format: yourname@example.com")
    .required("Please enter email address in format: yourname@example.com"),
  password: yup
    .string()
    .min(6)
    .required("Password should be at least 6 symbols long"),
});

const validationSchemaRegister = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "You can use only latin alphabet letters")
    .min(2)
    .required("Name should has at least 2 letters."),
  email: yup
    .string()
    .email("Please enter email address in format: yourname@example.com")
    .required("Please enter email address in format: yourname@example.com"),
  password: yup
    .string()
    .min(6)
    .required("Password should be at least 6 symbols long"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required field.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function WelcomePage(props) {
  const {
    isUserEmailAlreadyExists,
    isLoginPasswordCorrect,
    isUserEmailExists,
    registerUser,
    loginUser,
    isLoggedIn,
    isRegisteredSuccessfully,
  } = props;
  useEffect(() => {
    if (isUserEmailAlreadyExists) {
      setErrors((prevValues) => {
        return {
          ...prevValues,
          email: "This email already registered. Try another one.",
        };
      });
    }
    if (!isUserEmailExists) {
      setErrors((prevValues) => {
        return {
          ...prevValues,
          email: "This email is not registered yet. Make sure it's correct.",
        };
      });
    }
    if (!isLoginPasswordCorrect) {
      setErrors((prevValues) => {
        return {
          ...prevValues,
          password: "Password is incorrect.",
        };
      });
    }
    if (isRegisteredSuccessfully) {
      setLoginVisibility(true);
      setNotificationVisibility(true);
    }
  }, [
    isUserEmailAlreadyExists,
    isUserEmailExists,
    isLoginPasswordCorrect,
    isRegisteredSuccessfully,
  ]);
  const [isLoginVisible, setLoginVisibility] = useState(true);
  const [notificationVisibility, setNotificationVisibility] = useState(false);

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationVisibility(false);
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const classes = useStyles();

  function handleLoginVisibility(state) {
    setLoginVisibility(state);
    setErrors({ name: "", email: "" });
    setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
    setLoginData({ email: "", password: "" });
  }

  function handleRegisterData(data) {
    const { name, value } = data;
    setErrors((prevValues) => {
      return { ...prevValues, [name]: "" };
    });
    setRegisterData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function handleRegisterSubmit() {
    try {
      validationSchemaRegister.validateSync(
        { ...registerData },
        { abortEarly: false }
      );
      //To the Redux we must send an object without field "confirmPassword"
      const modifiedData = Object.fromEntries(
        Object.entries(registerData).filter(([key, value]) => {
          return key !== "confirmPassword";
        })
      );
      registerUser(modifiedData);
    } catch (err) {
      const getErrorFields = () =>
        err.inner.reduce((obj, item) => {
          obj[item.path] = item.message;
          return obj;
        }, {});
      const errorFields = getErrorFields();
      setErrors(errorFields);
    }
  }

  function handleLoginData(data) {
    const { name, value } = data;
    setErrors((prevValues) => {
      return { ...prevValues, [name]: "" };
    });
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function handleLoginSubmit() {
    try {
      validationSchemaLogin.validateSync(
        { ...loginData },
        { abortEarly: false }
      );
      loginUser(loginData);
    } catch (err) {
      const getErrorFields = () =>
        err.inner.reduce((obj, item) => {
          obj[item.path] = item.message;
          return obj;
        }, {});
      const errorFields = getErrorFields();
      setErrors(errorFields);
    }
  }

  return (
    <div className={classes.container}>
      {isLoggedIn ? (
        <Redirect to="/api/developers" />
      ) : (
        <div>
          {isLoginVisible ? (
            <LogRegForm
              header="Login"
              textfields="email, password"
              values={loginData}
              notRegistered={true}
              setLoginVisibility={handleLoginVisibility}
              onChange={handleLoginData}
              onSubmit={handleLoginSubmit}
              errors={errors}
            />
          ) : (
            <LogRegForm
              header="Register"
              textfields="name, email, password, confirm password"
              setLoginVisibility={handleLoginVisibility}
              onChange={handleRegisterData}
              notRegistered={false}
              onSubmit={handleRegisterSubmit}
              values={registerData}
              errors={errors}
            />
          )}
          <NotificationMessage
            visibility={notificationVisibility}
            handleClick={handleNotificationClose}
            message="Registration successful. You can login now."
          />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = { registerUser, loginUser };
function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    isUserEmailAlreadyExists: state.isUserEmailAlreadyExists,
    isUserEmailExists: state.isUserEmailExists,
    isLoginPasswordCorrect: state.isLoginPasswordCorrect,
    isRegisteredSuccessfully: state.isRegisteredSuccessfully,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
