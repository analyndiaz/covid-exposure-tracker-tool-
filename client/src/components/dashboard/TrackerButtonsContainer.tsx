import React, { useState } from "react";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { TrackerButton } from "../common";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import ClearAllRoundedIcon from "@material-ui/icons/ClearAllRounded";
import PlaceRoundedIcon from "@material-ui/icons/PlaceRounded";
import SocialInteractionForm from "../social-interaction/SocialInteractionForm";
import VisitedPlaceForm from "../visited-place/VisitedPlaceForm";
import { RootState } from "../../redux/reducers";

const TrackerButtonsContainer = () => {
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
  const interactionCount = useSelector<number>((state) => state.socialInteraction.socialInteractions.length);
  const placeCount = useSelector<number>((state) => state.visitedPlace.visitedPlaces.length);

  const [openAddInteractionModal, setOpenAddInteractionModal] = useState<boolean>(false);
  const [openAddPlaceModal, setOpenAddPlaceModal] = useState<boolean>(false);

  const onToggleAddInteractionModal = () => {
    setOpenAddInteractionModal(!openAddInteractionModal);
  };

  const onToggleAddPlaceModal = () => {
    setOpenAddPlaceModal(!openAddPlaceModal);
  };
  const onResetData = () => {};

  return (
    <div>
      <TrackerButton
        title="Add Social Interaction"
        count={interactionCount}
        onClickHandler={onToggleAddInteractionModal}
      >
        <EmojiPeopleRoundedIcon />
      </TrackerButton>
      <SocialInteractionForm open={openAddInteractionModal} onCloseHandler={onToggleAddInteractionModal} />
      <TrackerButton title="Add Visited Place" count={placeCount} onClickHandler={onToggleAddPlaceModal}>
        <PlaceRoundedIcon />
      </TrackerButton>
      <VisitedPlaceForm open={openAddPlaceModal} onCloseHandler={onToggleAddPlaceModal} />
      <TrackerButton title="Reset Data" count={interactionCount + placeCount} onClickHandler={onResetData}>
        <ClearAllRoundedIcon />
      </TrackerButton>
    </div>
  );
};

export default TrackerButtonsContainer;
