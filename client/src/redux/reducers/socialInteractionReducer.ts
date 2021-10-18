import { Action, Reducer } from "redux";
import initialState from "../store/initialState";
import { StoreState } from "../store/StoreState";
import { CustomSocialInterAction } from "../actions/customAction";
import * as types from "../actions/actionTypes";
import "../../helpers/arrayHelpers";
import { SocialInteraction } from "../../models";

const socialInteractionReducer: Reducer<StoreState, CustomSocialInterAction> = (
  state: StoreState = initialState,
  action: CustomSocialInterAction
) => {
  switch (action.type) {
    case types.SOCIAL_INTERACTIONS_LOAD_SUCCESS:
      return { ...state, socialInteractions: action.interactions };
    case types.SOCIAL_INTERACTION_CREATE_SUCCESS:
      let newInteractions = [...state.socialInteractions];
      newInteractions.push(action.interaction);
      return { ...state, socialInteractions: newInteractions };
    case types.SOCIAL_INTERACTIONS_LOAD_GROUP_SUCCESS:
      return {
        ...state,
        interactionCountByDate: state.socialInteractions.getFilteredGroupCount(
          action.days
        ),
      };
    case types.SOCIAL_INTERACTIONS_LOAD_RECENT_SUCCESS:
      return {
        ...state,
        filteredSocialInteractions: state.socialInteractions.getFilteredByDate(
          action.days
        ),
      };
    case types.SOCIAL_INTERACTION_UPDATE_SUCCESS:
      return {
        ...state,
        socialInteractions: state.socialInteractions.map((interaction) =>
          interaction._id === action.interaction._id
            ? action.interaction
            : interaction
        ),
      };
    case types.SOCIAL_INTERACTION_DELETE_SUCCESS:
      return {
        ...state,
        socialInteractions: state.socialInteractions.filter(
          (interaction) => interaction._id !== action.interaction._id
        ),
      };
    case types.SOCIAL_INTERACTION_CHECK_DISTANCING:
      debugger;
      return {
        ...state,
        socialDistancingPracticed: isSocialDistancing(
          state.socialInteractions,
          action.days
        ),
      };
    case types.SOCIAL_INTERACTION_GET_DISTINCT:
      debugger;
      return {
        ...state,
        distinctNames: state.socialInteractions.getDistinctProperty("name"),
      };
    default:
      return state;
  }
};

function isSocialDistancing(
  socialInteractions: SocialInteraction[],
  days: number
) {
  if (socialInteractions.length === 0) return true;

  return (
    socialInteractions
      .getFilteredByDate(days)
      .filter(
        (interaction: SocialInteraction) => !interaction.isSocialDistancing
      ).length === 0
  );
}

export default socialInteractionReducer;
