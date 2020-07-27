import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper, Avatar } from "@material-ui/core";
import InputField from "../AddNewDeveloperForm/InputField/InputField";
import { addDeveloper } from "../../redux/actions/index";
import { connect } from "react-redux";
import DialogOnSuccessAdd from "../dialogs/DialogOnSuccessAdd/DialogOnSuccessAdd";
import * as yup from "yup";

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
  container: {
    margin: theme.spacing(4, 0, 0, 0),
  },
}));

const validationSchema = yup.object().shape({
  name: yup.string().min(2).required("Name should has at least 2 letters."),
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

function AddNewDeveloperForm(props) {
  const classes = useStyles();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });
  const [successDialogOpened, setSuccessDialogVisibility] = useState(false);
  const [developer, setDeveloper] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });

  useEffect(() => {
    if (props.isDeveloperAdded) {
      setSuccessDialogVisibility(true);
      setDeveloper({
        name: "",
        email: "",
        username: "",
        phone: "",
      });
    }
    if (props.isDeveloperEmailAlreadyExists) {
      setErrors((prevValues) => {
        return {
          ...prevValues,
          email: "This email already exists. Choose another one.",
        };
      });
    }
  }, [props.isDeveloperAdded, props.isDeveloperEmailAlreadyExists]);

  function handleSubmit(event) {
    event.preventDefault();
    try {
      validationSchema.validateSync({ ...developer }, { abortEarly: false });
      props.addDeveloper(developer);
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

  function handleSuccessDialogClose() {
    setSuccessDialogVisibility(false);
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
    <Grid container>
      <Grid item xs={false} sm={2} />
      <Grid item xs={12} sm={8}>
        <Paper elevation={3} className={classes.container}>
          <form className={classes.form} action="POST" onSubmit={handleSubmit}>
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
        </Paper>
      </Grid>
      <Grid item xs={false} sm={2} />
      <DialogOnSuccessAdd
        title={`Add another one or move back to the main page?`}
        text={`New developer added nicely!`}
        open={successDialogOpened}
        onClose={handleSuccessDialogClose}
      />
    </Grid>
  );
}

const addDispatchToProps = { addDeveloper };
function mapStateToProps(state) {
  return {
    isDeveloperAdded: state.isDeveloperAdded,
    isDeveloperEmailAlreadyExists: state.isDeveloperEmailAlreadyExists,
  };
}
export default connect(
  mapStateToProps,
  addDispatchToProps
)(AddNewDeveloperForm);
