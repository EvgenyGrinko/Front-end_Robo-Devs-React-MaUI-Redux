import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper, Avatar } from "@material-ui/core";
import InputField from "../AddNewDeveloperForm/InputField/InputField";
import { addDeveloper } from "../../redux/actions/index";
import { connect } from "react-redux";
import DialogSuccess from "../DialogSuccess/DialogSuccess";

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
  inputAddImg:{
    display: "none",
  }
}));

function AddNewDeveloperForm(props) {
  const classes = useStyles();
  const [successDialogOpened, setsuccessDialogVisibility] = useState(false);
  const [developer, setDeveloper] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (
      Object.values(developer).every((item) => {
        return item !== "";
      })){
        props.addDeveloper(developer);
        setsuccessDialogVisibility(true);
      }
    
  }

  function handleSuccessDialogClose() {
    setsuccessDialogVisibility(false);
  }

  function handleDeveloperInfo(target) {
    setDeveloper((prevValues) => {
      const name = target.name;
      const value = target.value;
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
              onChange={handleDeveloperInfo}
              value={developer.name}
              isRequired={true}
            />
            <InputField
              name="username"
              onChange={handleDeveloperInfo}
              value={developer.username}
              isRequired={true}
            />
            <InputField
              name="email"
              onChange={handleDeveloperInfo}
              value={developer.email}
              isRequired={true}
            />
            <InputField
              name="phone"
              onChange={handleDeveloperInfo}
              value={developer.phone}
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
      <DialogSuccess
        title={props.error ? `${props.error}` : "New developer added nicely"}
        open={successDialogOpened}
        onClose={handleSuccessDialogClose}
      />
    </Grid>
  );
}

const addDispatchToProps = { addDeveloper };
function mapStateToProps(state){
  return {error: state.error}
}
export default connect(mapStateToProps, addDispatchToProps)(AddNewDeveloperForm);
