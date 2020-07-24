import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, TextField, Button, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { getOneDeveloper, editDeveloper } from "../../redux/actions/index";
import DialogSuccess from "../dialogs/DialogSuccessDelete/DialogSuccessDelete";

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function EditDeveloper(props) {
  const id = props.match.params.id;

  useEffect(() => {
    props.getOneDeveloper(id);
  }, []);

  const {
    currentDeveloper: { developer, success },
  } = props;

  const [edittedDeveloper, setEdittedDeveloper] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });

  const [successDialogOpened, setsuccessDialogVisibility] = useState(false);

  function handleSuccessDialogClose() {
    setsuccessDialogVisibility(false);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setEdittedDeveloper((prevValues) => {
      return Object.fromEntries(
        Object.entries(prevValues).map(([key, prevValue]) => {
          if (key === name) return [key, value];
          if (!prevValue) return [key, developer[key]];
          else return [key, prevValue];
        })
      );
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    props.editDeveloper(edittedDeveloper, id);
    setsuccessDialogVisibility(true);
  }
  const classes = useStyles();
  return (
    <div>
      {success ? (
        <form action="PATCH" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            defaultValue={developer.name}
            autoFocus
            onChange={handleChange}
          />
          <TextField
            label="Username"
            name="username"
            defaultValue={developer.username}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            defaultValue={developer.phone}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            defaultValue={developer.email}
            onChange={handleChange}
          />
          <Button type="submit">Submit changes</Button>
        </form>
      ) : (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      )}
      <DialogSuccess
        title={props.error ? `${props.error}` : "Developer eddited nicely"}
        open={successDialogOpened}
        onClose={handleSuccessDialogClose}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return { currentDeveloper: state.currentDeveloper, error: state.error };
}

const mapDispatchToProps = { getOneDeveloper, editDeveloper };

export default connect(mapStateToProps, mapDispatchToProps)(EditDeveloper);
