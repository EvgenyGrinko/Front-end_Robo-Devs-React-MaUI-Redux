import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogButtonContainer: {
    display: "flex",
    padding: theme.spacing(1),
  },
  dialogButton: {
    width: "50%",
    "&:first-child": { marginRight: theme.spacing(1) },
  },
  dialogHeader: {
    textAlign: "center",
  },
}));

function DialogDelete(props) {
  const classes = useStyles();

  return (
    <Dialog
      onClose={() => {
        props.onClose();
      }}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title" className={classes.dialogHeader}>
        Are you sure?
      </DialogTitle>
      <div className={classes.dialogButtonContainer}>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="secondary"
          onClick={() => {
            props.onDelete();
          }}
        >
          Delete
        </Button>
        <Button
          className={classes.dialogButton}
          variant="contained"
          onClick={() => {
            props.onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

export default DialogDelete;
