import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core/";
import { Link } from "react-router-dom";

function DialogSuccess(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "#4791db" }} id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/api/developers">
            <Button color="primary">Back to main</Button>
          </Link>
          <Button
            onClick={() => {
              props.onClose();
            }}
            color="primary"
          >
            Add one more
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogSuccess;
