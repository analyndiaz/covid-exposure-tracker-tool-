import { Dispatch } from "react";
import * as service from "../../services/socialInteractionService";
import { CustomSocialInterAction } from "./customAction";
import { SocialInteraction } from "../../models";
import * as types from "./actionTypes";
import { beginServiceCall, serviceCallError } from "./serviceStatsActions";
import { defaultSocialInteraction } from "../../models/defaultValues";

const SERVICE_NAME = "Social Interaction";

function loadSocialInteractionSuccess(socialInteractions: SocialInteraction[]): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTIONS_LOAD_SUCCESS,
    interactions: socialInteractions,
    interaction: defaultSocialInteraction,
    days: 0,
  };
}

function loadRecentSocialInteractionSuccess(days: number): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTIONS_LOAD_RECENT_SUCCESS,
    days: days,
    interactions: [],
    interaction: defaultSocialInteraction,
  };
}

function loadGroupSocialInteractionsSuccess(days: number): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTIONS_LOAD_GROUP_SUCCESS,
    days: days,
    interactions: [],
    interaction: defaultSocialInteraction,
  };
}

function createSocialInteractionSuccess(socialInteraction: SocialInteraction): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTION_CREATE_SUCCESS,
    interaction: socialInteraction,
    interactions: [],
    days: 0,
  };
}

function updateSocialInteractionSuccess(socialInteraction: SocialInteraction): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTION_UPDATE_SUCCESS,
    interaction: socialInteraction,
    interactions: [],
    days: 0,
  };
}

function deleteSocialInteractionSuccess(socialInteraction: SocialInteraction): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTION_DELETE_SUCCESS,
    interaction: socialInteraction,
    interactions: [],
    days: 0,
  };
}

export function isSocialDistancingPracticed(days: number): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTION_CHECK_DISTANCING,
    days: days,
    interaction: defaultSocialInteraction,
    interactions: [],
  };
}

export function getDistinctNames(): CustomSocialInterAction {
  return {
    type: types.SOCIAL_INTERACTION_GET_DISTINCT,
    days: 0,
    interaction: defaultSocialInteraction,
    interactions: [],
  };
}

export function loadSocialInteractions(dispatch: Dispatch<any>) {
  dispatch(beginServiceCall(SERVICE_NAME));
  return service
    .getAllSocialInteractions()
    .then((interactions) => {
      dispatch(loadSocialInteractionSuccess(interactions as SocialInteraction[]));
    })
    .catch((error) => {
      dispatch(serviceCallError(error, SERVICE_NAME));
    });
}

export function loadRecentSocialInteraction(days: number = 0, dispatch: Dispatch<any>) {
  setTimeout(() => {
    dispatch(beginServiceCall(SERVICE_NAME));
  }, 600);
  return dispatch(loadRecentSocialInteractionSuccess(days));
}

export function loadGroupSocialInteraction(days: number = 0, dispatch: Dispatch<any>) {
  setTimeout(() => {
    dispatch(beginServiceCall(SERVICE_NAME));
  }, 600);
  return dispatch(loadGroupSocialInteractionsSuccess(days));
}

export function saveSocialInteraction(socialInteraction: SocialInteraction, dispatch: Dispatch<any>) {
  dispatch(beginServiceCall(SERVICE_NAME));
  return service
    .saveSocialInteraction(socialInteraction)
    .then((savedInteraction: SocialInteraction) => {
      socialInteraction._id
        ? dispatch(updateSocialInteractionSuccess(savedInteraction))
        : dispatch(createSocialInteractionSuccess(savedInteraction));
    })
    .catch((error) => {
      dispatch(serviceCallError(error, SERVICE_NAME));
    });
}

export function deleteSocialInteractions(socialInteraction: SocialInteraction, dispatch: Dispatch<any>) {
  dispatch(beginServiceCall(SERVICE_NAME));
  return service
    .deleteSocialInteraction(socialInteraction._id)
    .then(() => {
      dispatch(deleteSocialInteractionSuccess(socialInteraction));
    })
    .catch((error) => {
      dispatch(serviceCallError(error, SERVICE_NAME));
    });
}
