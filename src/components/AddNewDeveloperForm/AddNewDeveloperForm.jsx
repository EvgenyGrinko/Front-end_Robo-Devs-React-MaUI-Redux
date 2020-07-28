import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { addDeveloper } from "../../redux/actions/index";
import { connect } from "react-redux";
import DialogOnSuccessAdd from "../dialogs/DialogOnSuccessAdd/DialogOnSuccessAdd";
import DeveloperForm from "../DeveloperForm/DeveloperForm";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4, 0, 0, 0),
  },
}));

function AddNewDeveloperForm(props) {
  const { isDeveloperAdded, addDeveloper } = props;
  const classes = useStyles();
  const [successDialogOpened, setSuccessDialogVisibility] = useState(false);

  useEffect(() => {
    if (isDeveloperAdded) {
      setSuccessDialogVisibility(true);
    }
  }, [isDeveloperAdded]);

  function handleSubmit(developer) {
    addDeveloper(developer);
  }

  function handleSuccessDialogClose() {
    setSuccessDialogVisibility(false);
  }

  return (
    <Grid container>
      <Grid item xs={false} sm={2} />
      <Grid item xs={12} sm={8}>
        <Paper elevation={3} className={classes.container}>
          <DeveloperForm onSubmit={handleSubmit} type="add" />
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
  };
}
export default connect(
  mapStateToProps,
  addDispatchToProps
)(AddNewDeveloperForm);
