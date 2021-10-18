import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import { CustomServiceStatAction } from "../actions/customAction";
import { StoreState } from "../store/StoreState";

function actionTypeEndsInSuccess(type: string) {
  return type.substring(type.length - 7) === "SUCCESS";
}

export default function serviceStatsReducer(state: StoreState = initialState, action: CustomServiceStatAction) {
  if (action.type === types.SERVICE_BEGIN_CALL) {
    if (action.service === "Social Interaction") {
      return {
        ...state,
        socialInteractionServiceCallStarted: true,
        serviceCallsInProgress: state.serviceCallsInProgress + 1,
      };
    } else if (action.service === "Visited Place") {
      return {
        ...state,
        visitedPlaceServiceCallStarted: true,
        serviceCallsInProgress: state.serviceCallsInProgress + 1,
      };
    }
  } else if (actionTypeEndsInSuccess(action.type)) {
    return {
      ...state,
      serviceCallsInProgress: state.serviceCallsInProgress - 1,
    };
  } else if (action.type === types.SERVICE_CALL_ERROR) {
    return {
      ...state,
      error: action.error,
      serviceCallsInProgress: state.serviceCallsInProgress - 1,
    };
  }

  return state;
}
