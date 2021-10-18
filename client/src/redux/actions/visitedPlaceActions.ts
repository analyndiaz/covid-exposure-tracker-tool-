import { Dispatch } from "react";
import * as service from "../../services/visitedPlaceService";
import { VisitedPlace } from "../../models";
import * as types from "./actionTypes";
import { CustomVisitedPlaceAction } from "./customAction";
import { beginServiceCall, serviceCallError } from "./serviceStatsActions";
import { defaultVisitedPlace } from "../../models/defaultValues";

const SERVICE_NAME = "Visited Place";

function loadVisitedPlacesSuccess(socials: VisitedPlace[]): CustomVisitedPlaceAction {
  return { type: types.VISITED_PLACES_LOAD_SUCCESS, places: socials, place: defaultVisitedPlace, days: 0 };
}

function loadRecentVisitedPlacesSuccess(days: number): CustomVisitedPlaceAction {
  return {
    type: types.VISITED_PLACES_LOAD_RECENT_SUCCESS,
    days: days,
    places: [],
    place: defaultVisitedPlace,
  };
}

export function loadGroupVisitedPlacesSuccess(days: number): CustomVisitedPlaceAction {
  return {
    type: types.VISITED_PLACES_LOAD_GROUP_SUCCESS,
    days: days,
    places: [],
    place: defaultVisitedPlace,
  };
}

function createVisitedPlaceSuccess(visitedPlace: VisitedPlace): CustomVisitedPlaceAction {
  return {
    type: types.VISITED_PLACE_CREATE_SUCCESS,
    place: visitedPlace,
    places: [],
    days: 0,
  };
}

function updateVisitedPlaceSuccess(visitedPlace: VisitedPlace): CustomVisitedPlaceAction {
  return {
    type: types.VISITED_PLACE_UPDATE_SUCCESS,
    place: visitedPlace,
    places: [],
    days: 0,
  };
}

function deleteVisitedPlaceSuccess(visitedPlace: VisitedPlace): CustomVisitedPlaceAction {
  return {
    type: types.VISITED_PLACE_DELETE_SUCCESS,
    place: visitedPlace,
    places: [],
    days: 0,
  };
}

export function noCrowdedPlaces(days: number): CustomVisitedPlaceAction {
  return {
    type: types.VISITED_PLACE_CHECK_CROWDED,
    days: days,
    places: [],
    place: defaultVisitedPlace,
  };
}

export function getDistinctPlaces(): CustomVisitedPlaceAction {
  return {
    type: types.VISITED_PLACE_GET_DISTINCT,
    days: 0,
    places: [],
    place: defaultVisitedPlace,
  };
}

export function loadVisitedPlaces(dispatch: Dispatch<any>) {
  dispatch(beginServiceCall(SERVICE_NAME));
  return service
    .getAllVisitedPlaces()
    .then((places) => {
      dispatch(loadVisitedPlacesSuccess(places as VisitedPlace[]));
    })
    .catch((error) => {
      dispatch(serviceCallError(error, SERVICE_NAME));
    });
}

export function loadRecentVisitedPlaces(days: number = 0, dispatch: Dispatch<any>) {
  setTimeout(() => {
    dispatch(beginServiceCall(SERVICE_NAME));
  }, 600);
  return dispatch(loadRecentVisitedPlacesSuccess(days));
}

export function loadGroupVisitedPlaces(days: number = 0, dispatch: Dispatch<any>) {
  setTimeout(() => {
    dispatch(beginServiceCall(SERVICE_NAME));
  }, 600);
  return dispatch(loadGroupVisitedPlacesSuccess(days));
}

export function saveVisitedPlace(visitedPlace: VisitedPlace, dispatch: Dispatch<any>) {
  dispatch(beginServiceCall(SERVICE_NAME));
  return service
    .saveVisitedPlace(visitedPlace)
    .then((savedPlace: VisitedPlace) => {
      visitedPlace._id
        ? dispatch(updateVisitedPlaceSuccess(savedPlace))
        : dispatch(createVisitedPlaceSuccess(savedPlace));
    })
    .catch((error) => {
      dispatch(serviceCallError(error, SERVICE_NAME));
    });
}

export function deleteVisitedPlace(visitedPlace: VisitedPlace, dispatch: Dispatch<any>) {
  dispatch(beginServiceCall(SERVICE_NAME));
  return service
    .deleteVisitedPlace(visitedPlace._id)
    .then(() => {
      dispatch(deleteVisitedPlaceSuccess(visitedPlace));
    })
    .catch((error) => {
      dispatch(serviceCallError(error, SERVICE_NAME));
    });
}
