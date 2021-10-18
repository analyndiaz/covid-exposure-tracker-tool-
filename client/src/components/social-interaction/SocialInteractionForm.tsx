import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { AddTrackForm, AutoCompleteField } from "../common";
import { SocialInteraction, ValidationState } from "../../models";
import * as actions from "../../redux/actions/socialInteractionActions";
import { defaultSocialInteraction } from "../../models/defaultValues";
import useService from "../../hooks/useService";
import useSocialInteractions from "../../hooks/useSocialInteractions";

type Props = {
  open: boolean;
  onCloseHandler: () => void;
};

const SocialInteractionForm: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState<ValidationState>(new ValidationState());

  const dispatch = useDispatch();

  const { loading, errors: serviceError } = useService();

  const [saving, setSaving] = useState<boolean>(false);
  const [newSocialInteraction, setNewSocialInteraction] =
    useState<SocialInteraction>(defaultSocialInteraction);

  const { socialInteractions: allSocialInteractions, distinctInteractions } =
    useSocialInteractions();

  useEffect(() => {
    dispatch(actions.getDistinctNames());
  }, [allSocialInteractions]);

  function onChangeHandler(event: any, selectedValue: any = undefined) {
    let { id, value } = event.target;
    if (id.substring(0, 4) === "name") {
      value = selectedValue;
      id = "name";
    }
    if (id === "isSocialDistancing") value = event.target.checked;

    setNewSocialInteraction((prevInteraction: SocialInteraction) => ({
      ...prevInteraction,
      [id]: id === "hours" ? +value : value,
    }));
  }

  function formIsValid() {
    const { name, date, hours } = newSocialInteraction;
    const validationState = new ValidationState();

    if (name === defaultSocialInteraction.name) {
      validationState.addErrors({
        property: "name",
        errorMessage: "Name is required.",
      });
    }
    if (date === defaultSocialInteraction.date) {
      validationState.addErrors({
        property: "date",
        errorMessage: "Date is required.",
      });
    }
    if (hours === defaultSocialInteraction.hours) {
      validationState.addErrors({
        property: "hours",
        errorMessage: "Hours is required.",
      });
    }

    setState(validationState);
    return validationState.isValid();
  }

  function onSaveHandler() {
    setSaving(true);
    if (formIsValid()) {
      actions.saveSocialInteraction(newSocialInteraction, dispatch).then(() => {
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
    invalidState.addErrors({
      property: "service",
      errorMessage: `Internal error occured. ${serviceError}}`,
    });
    setState(invalidState);
  }

  function onCloseHandler() {
    props.onCloseHandler();
    setState(new ValidationState());
    setSaving(false);
  }

  return (
    <AddTrackForm
      open={props.open}
      state={state}
      onCloseHandler={onCloseHandler}
      title="Add Social Interaction"
      onSubmitHandler={onSaveHandler}
      onChangeHandler={onChangeHandler}
      saving={saving}
      upperNode={
        <AutoCompleteField
          title="Name"
          id="name"
          options={distinctInteractions}
          onChangeHandler={onChangeHandler}
          state={state}
        />
      }
      lowerNode={
        <FormControlLabel
          control={
            <Checkbox
              onChange={onChangeHandler}
              id="isSocialDistancing"
              color="primary"
            />
          }
          label="Is Social Distancing Observed?"
        />
      }
    />
  );
};

export default SocialInteractionForm;
