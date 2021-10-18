import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { RootState } from "../redux/reducers";
import { SocialInteraction } from "../models";
import { TrackerDataPoints } from "../components/common";

const useSocialInteractions = () => {
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

  const socialInteractions = useSelector<SocialInteraction[]>(
    (state) => state.socialInteraction.socialInteractions
  );

  const socialInteractionsByDate = useSelector<TrackerDataPoints[]>(
    (state) => state.socialInteraction.interactionCountByDate
  );

  const distinctInteractions = useSelector<string[]>(
    (state) => state.socialInteraction.distinctNames
  );

  return {
    socialInteractions,
    socialInteractionsByDate,
    distinctInteractions,
  };
};

export default useSocialInteractions;
