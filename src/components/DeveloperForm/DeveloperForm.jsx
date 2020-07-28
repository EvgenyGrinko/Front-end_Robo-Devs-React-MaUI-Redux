import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import InputField from "../AddNewDeveloperForm/InputField/InputField";
import * as yup from "yup";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: theme.spacing(1),
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
    initialDeveloper,
    error,
    type,
    onEditSetSuccessDialogVisibility,
    isDeveloperEditted,
    onSubmit,
  } = props;

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });
  const [developer, setDeveloper] = useState(() => {
    if (type === "edit") {
      return {
        name: initialDeveloper.name,
        email: initialDeveloper.email,
        username: initialDeveloper.username,
        phone: initialDeveloper.phone,
      };
    } else {
      return { name: "", email: "", username: "", phone: "" };
    }
  });

  useEffect(() => {
    if (isDeveloperEmailAlreadyExists) {
      setErrors((prevValues) => {
        return {
          ...prevValues,
          email: error,
        };
      });
    }
    if (type === "add" && !error) {
      setDeveloper({
        name: "",
        email: "",
        username: "",
        phone: "",
      });
    }
    if (type === "edit" && isDeveloperEditted) {
      onEditSetSuccessDialogVisibility(false);
      setTimeout(() => {
        onEditSetSuccessDialogVisibility(true);
      }, 150);
    }
  }, [
    isDeveloperEmailAlreadyExists,
    error,
    isDeveloperEditted,
    onEditSetSuccessDialogVisibility,
    type,
  ]);
  function handleSubmit(event) {
    event.preventDefault();
    try {
      validationSchema.validateSync({ ...developer }, { abortEarly: false });
      onSubmit(developer);
      setErrors({
        name: "",
        email: "",
        username: "",
        phone: "",
      });
    } catch (err) {
      if (type === "edit") onEditSetSuccessDialogVisibility(false);
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

function mapStateToProps(state) {
  return {
    isDeveloperEmailAlreadyExists: state.isDeveloperEmailAlreadyExists,
    error: state.error,
    currentDeveloper: state.currentDeveloper,
    isDeveloperEditted: state.isDeveloperEditted,
  };
}
export default connect(mapStateToProps)(DeveloperForm);
