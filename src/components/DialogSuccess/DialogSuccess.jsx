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
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              props.onClose();
            }}
            color="primary"
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogSuccess;
