import React, { useState, useEffect } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { AddTrackForm, AutoCompleteField } from "../common";
import { VisitedPlace, ValidationState } from "../../models";
import { RootState } from "../../redux/reducers";
import { defaultVisitedPlace } from "../../models/defaultValues";
import * as actions from "../../redux/actions/visitedPlaceActions";

type Props = {
  open: boolean;
  onCloseHandler: () => void;
};

const VisitedPlaceForm: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState<ValidationState>(new ValidationState());

  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

  const loading = useSelector<number>((state) => state.serviceStats.serviceCallsInProgress) > 0;
  const serviceError = useSelector<Error | null>((state) => state.serviceStats.error);

  const [saving, setSaving] = useState<boolean>(false);
  const [newVisitedPlace, setNewVisitedPlace] = useState<VisitedPlace>(defaultVisitedPlace);

  const allVisitedPlaces = useSelector<VisitedPlace[]>((state) => state.visitedPlace.visitedPlaces);
  const distinctPlaces = useSelector<string[]>((state) => state.visitedPlace.distinctPlaces);

  useEffect(() => {
    dispatch(actions.getDistinctPlaces());
  }, [allVisitedPlaces]);

  function onChangeHandler(event: any, selectedValue: any = undefined) {
    let { id, value } = event.target;
    if (id.substring(0, 5) === "place") {
      value = selectedValue;
      id = "place";
    }
    if (id === "isCrowded") value = event.target.checked;

    setNewVisitedPlace((prevPlace: VisitedPlace) => ({
      ...prevPlace,
      [id]: id === "hours" ? +value : value,
    }));
  }

  function formIsValid() {
    const { place, date, hours } = newVisitedPlace;
    const validationState = new ValidationState();

    if (place === defaultVisitedPlace.place) {
      validationState.addErrors({ property: "place", errorMessage: "Place is required." });
    }
    if (date === defaultVisitedPlace.date) {
      validationState.addErrors({ property: "date", errorMessage: "Date is required." });
    }
    if (hours === defaultVisitedPlace.hours) {
      validationState.addErrors({ property: "hours", errorMessage: "Hours is required." });
    }

    setState(validationState);
    return validationState.isValid();
  }

  function onSaveHandler() {
    debugger;
    setSaving(true);
    if (formIsValid()) {
      actions.saveVisitedPlace(newVisitedPlace, dispatch).then(() => {
        if (serviceError) {
          setSaving(false);
          addServiceError();
        } else if (!loading) {
          onCloseHandler();
        }
      });
    } else setSaving(false);
  }

  function addServiceError() {
    var invalidState = new ValidationState();
    invalidState.addErrors({ property: "service", errorMessage: `Internal error occured. ${serviceError}}` });
    setState(invalidState);
  }

  function onCloseHandler() {
    setState(new ValidationState());
    props.onCloseHandler();
    setSaving(false);
  }

  return (
    <AddTrackForm
      open={props.open}
      state={state}
      onCloseHandler={onCloseHandler}
      title="Add Visited Place"
      onSubmitHandler={onSaveHandler}
      onChangeHandler={onChangeHandler}
      saving={saving}
      upperNode={
        <AutoCompleteField
          title="Place"
          id="place"
          options={distinctPlaces}
          onChangeHandler={onChangeHandler}
          state={state}
        />
      }
      lowerNode={
        <FormControlLabel
          control={<Checkbox onChange={onChangeHandler} id="isCrowded" color="primary" />}
          label="Is Crowded?"
        />
      }
    />
  );
};

export default VisitedPlaceForm;
