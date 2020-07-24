import React from "react";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core/";

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
        <DialogActions>
          <Button
            onClick={() => {
              props.onClose();
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogSuccess;
