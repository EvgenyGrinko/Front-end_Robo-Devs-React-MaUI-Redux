import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import InputField from "../AddNewDeveloperForm/InputField/InputField";
import * as yup from "yup";
import { connect } from "react-redux";
import { getOneDeveloper } from "../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(4),
    display: "flex",
    flexFlow: "column nowrap",
    overflow: "auto",
    flexGrow: 1,
  },
  submitButton: {
    alignSelf: "center",
    margin: theme.spacing(2, 0, 0, 0),
    width: "50%",
  },
}));

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "You can use only latin alphabet letters")
    .min(2)
    .required("Name should has at least 2 letters."),
  username: yup
    .string()
    .max(255)
    .min(6)
    .required("Userame should has at least 6 letters."),
  phone: yup
    .number()
    .integer("A phone number can't include a decimal point")
    .positive("A phone number can't start with a minus")
    .min(11)
    .required("A phone number is required"),
  email: yup
    .string()
    .email("Please enter email address in format: yourname@example.com")
    .required("Please enter email address in format: yourname@example.com"),
});

function DeveloperForm(props) {
  const classes = useStyles();
  const {
    isDeveloperEmailAlreadyExists,
    currentDeveloper,
    error,
    getOneDeveloper,
    id,
  } = props;

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });
  const [developer, setDeveloper] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });
  // const id = props.match.params.id;

  useEffect(() => {
    if (isDeveloperEmailAlreadyExists) {
      setErrors((prevValues) => {
        return {
          ...prevValues,
          email: error,
        };
      });
    }
    if (id) {
      getOneDeveloper(id);
    }

    if (currentDeveloper)
      setDeveloper({
        name: currentDeveloper.developer.name,
        email: currentDeveloper.developer.email,
        phone: currentDeveloper.developer.phone,
        username: currentDeveloper.developer.username,
      });

    // if (initialDeveloper) setDeveloper(initialDeveloper);
  }, [isDeveloperEmailAlreadyExists]);

  function handleSubmit(event) {
    event.preventDefault();
    try {
      validationSchema.validateSync({ ...developer }, { abortEarly: false });
      props.onSubmit(developer);
      setErrors({
        name: "",
        email: "",
        username: "",
        phone: "",
      });
      // if (!error){
      //   setDeveloper({
      //     name: "",
      //     email: "",
      //     username: "",
      //     phone: "",
      //   });
      // }
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

  function handleDeveloperInfo(target) {
    const { name, value } = target;
    setErrors((prevValues) => {
      return { ...prevValues, [name]: "" };
    });
    setDeveloper((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <InputField
        name="name"
        error={Boolean(errors.name)}
        onChange={handleDeveloperInfo}
        value={developer.name}
        helperText={errors.name}
        isRequired={true}
      />
      <InputField
        name="username"
        error={Boolean(errors.username)}
        onChange={handleDeveloperInfo}
        value={developer.username}
        helperText={errors.username}
        isRequired={true}
      />
      <InputField
        name="email"
        error={Boolean(errors.email)}
        onChange={handleDeveloperInfo}
        value={developer.email}
        helperText={errors.email}
        isRequired={true}
      />
      <InputField
        name="phone"
        error={Boolean(errors.phone)}
        onChange={handleDeveloperInfo}
        value={developer.phone}
        helperText={errors.phone}
        isRequired={true}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        submit
      </Button>
    </form>
  );
}

const addDispatchToProps = { getOneDeveloper };
function mapStateToProps(state) {
  return {
    isDeveloperEmailAlreadyExists: state.isDeveloperEmailAlreadyExists,
    error: state.error,
    currentDeveloper: state.currentDeveloper,
  };
}
export default connect(mapStateToProps, addDispatchToProps)(DeveloperForm);
