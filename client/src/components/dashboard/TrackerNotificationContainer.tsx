import React, { useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import { IconButton, withStyles } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Notifications from "../../components/common/header/Notifications";
import { useDispatch, TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { SocialInteraction, VisitedPlace } from "../../models";
import * as socialActions from "../../redux/actions/socialInteractionActions";
import * as placeActions from "../../redux/actions/visitedPlaceActions";
import constant from "../../constants/config.json";

const SOCIAL_TARGET_DAYS: number = constant.SocialInteraction_Filter_NumDays;
const PLACE_TARGET_DAYS: number = constant.VisitedPlace_Filter_NumDays;

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TrackerNotificationContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

  const noVisitedCrowdedPlace = useSelector<boolean>((state) => state.visitedPlace.noVisitedCrowdedPlace);
  const socialDistancingPracticed = useSelector<boolean>((state) => state.socialInteraction.socialDistancingPracticed);

  const socialInteractions = useSelector<SocialInteraction[]>((state) => state.socialInteraction.socialInteractions);
  const visitedPlaces = useSelector<VisitedPlace[]>((state) => state.visitedPlace.visitedPlaces);

  function getBadgeCount() {
    if (socialDistancingPracticed && noVisitedCrowdedPlace) return 0;
    else if (socialDistancingPracticed || noVisitedCrowdedPlace) return 1;
    return 2;
  }

  useEffect(() => {
    dispatch(socialActions.isSocialDistancingPracticed(SOCIAL_TARGET_DAYS));
  }, [socialInteractions]);

  useEffect(() => {
    dispatch(placeActions.noCrowdedPlaces(PLACE_TARGET_DAYS));
  }, [visitedPlaces]);

  function onClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  }

  return (
    <>
      <div>
        <IconButton aria-label="Notifications" onClick={onClickHandler}>
          <StyledBadge
            badgeContent={getBadgeCount() === 0 ? 2 : getBadgeCount()}
            color={getBadgeCount() === 0 ? "primary" : "secondary"}
          >
            <NotificationsRoundedIcon className="notification-btn" fontSize="large" />
          </StyledBadge>
        </IconButton>
      </div>
      <Notifications open={open} anchor={anchorEl} placement="bottom-end" className="notification-content">
        {socialDistancingPracticed ? (
          <Alert severity="success">You are maintaining proper social distancing. Keep it up!</Alert>
        ) : (
          <Alert severity="error">
            You did not practice social distancing for the past {SOCIAL_TARGET_DAYS} days. Stay at home and maintain 1-2
            meters away from other people.
          </Alert>
        )}
        {noVisitedCrowdedPlace ? (
          <Alert severity="success">Thank you for helping stop the spread of the virus by staying home.</Alert>
        ) : (
          <Alert severity="error">
            You have been exposed to a crowded place for the past {PLACE_TARGET_DAYS} days. Try to avoid crowded places
            to minimized your exposure risk.
          </Alert>
        )}
      </Notifications>
    </>
  );
};

export default TrackerNotificationContainer;
