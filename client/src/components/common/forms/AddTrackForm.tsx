import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import "./AddTrackForm.css";
import { ValidationState } from "../../../models";

type Props = {
  title: string;
  open: boolean;
  saving: boolean;
  state: ValidationState;
  onCloseHandler: () => void;
  onSubmitHandler: () => void;
  onChangeHandler: (event: any) => void;
  upperNode: React.ReactNode;
  lowerNode: React.ReactNode;
};

const currentDate = (): Date => {
  return new Date();
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={0} variant="outlined" {...props} />;
}

const AddTrackForm: React.FC<Props> = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.onCloseHandler}>
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        {props.state.errors.filter((err) => err.property === "service").length !== 0 && (
          <Alert severity="error">
            {props.state.errors.filter((err) => err.property === "service")[0]?.errorMessage}
          </Alert>
        )}
        {props.upperNode}
        <TextField
          id="date"
          type="date"
          variant="outlined"
          fullWidth
          onChange={props.onChangeHandler}
          inputProps={{ min: "2000-01-01", max: currentDate.toLocaleString() }}
          error={props.state.errors.filter((err) => err.property === "date").length !== 0}
          helperText={props.state.errors.filter((err) => err.property === "date")[0]?.errorMessage}
        />
        <TextField
          id="hours"
          label="Hours"
          type="number"
          variant="outlined"
          inputProps={{ min: "1", max: "24" }}
          fullWidth
          onChange={props.onChangeHandler}
          error={props.state.errors.filter((err) => err.property === "hours").length !== 0}
          helperText={props.state.errors.filter((err) => err.property === "hours")[0]?.errorMessage}
        />
        {props.lowerNode}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCloseHandler} color="primary" disabled={props.saving}>
          Cancel
        </Button>
        <Button onClick={props.onSubmitHandler} color="primary" disabled={props.saving}>
          {props.saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTrackForm;
