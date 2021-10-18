import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ValidationState } from "../../../models";

type Props = {
  title: string;
  id: string;
  options: string[];
  onChangeHandler: (event: any, value: string) => void;
  state: ValidationState;
};

const AutoCompleteField: React.FC<Props> = (props: Props) => {
  return (
    <Autocomplete
      freeSolo
      disableClearable
      id={props.id}
      options={props.options.map((option) => option)}
      getOptionLabel={(option) => option}
      onChange={(event, value) => props.onChangeHandler(event, value)}
      onInputChange={(event, value) => props.onChangeHandler(event, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          label={props.title}
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
          error={props.state.errors.filter((err) => err.property === props.id).length != 0}
          helperText={props.state.errors.filter((err) => err.property === props.id)[0]?.errorMessage}
        />
      )}
    />
  );
};

export default AutoCompleteField;
