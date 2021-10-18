import initialState from "../store/initialState";
import { StoreState } from "../store/StoreState";
import { CustomVisitedPlaceAction } from "../actions/customAction";
import * as types from "../actions/actionTypes";
import "../../helpers/arrayHelpers";
import { VisitedPlace } from "../../models";

const visitedPlaceReducer = (state: StoreState = initialState, action: CustomVisitedPlaceAction) => {
  switch (action.type) {
    case types.VISITED_PLACES_LOAD_SUCCESS:
      return { ...state, visitedPlaces: action.places };
    case types.VISITED_PLACE_CREATE_SUCCESS:
      let newPlaces = [...state.visitedPlaces];
      newPlaces.push(action.place);
      return { ...state, visitedPlaces: newPlaces };
    case types.VISITED_PLACES_LOAD_GROUP_SUCCESS:
      return { ...state, placeCountByDate: state.visitedPlaces.getFilteredGroupCount(action.days) };
    case types.VISITED_PLACES_LOAD_RECENT_SUCCESS:
      return { ...state, filteredVisitedPlaces: state.visitedPlaces.getFilteredByDate(action.days) };
    case types.VISITED_PLACE_UPDATE_SUCCESS:
      return {
        ...state,
        visitedPlaces: state.visitedPlaces.map((place) => (place._id === action.place._id ? action.place : place)),
      };
    case types.VISITED_PLACE_DELETE_SUCCESS:
      debugger;
      return {
        ...state,
        visitedPlaces: state.visitedPlaces.filter((place) => place._id !== action.place._id),
      };
    case types.VISITED_PLACE_CHECK_CROWDED:
      debugger;
      return {
        ...state,
        noVisitedCrowdedPlace: noCrowdedPlace(state.visitedPlaces, action.days),
      };
    case types.VISITED_PLACE_GET_DISTINCT:
      debugger;
      return {
        ...state,
        distinctPlaces: state.visitedPlaces.getDistinctProperty("place"),
      };
    default:
      return state;
  }
};

function noCrowdedPlace(places: VisitedPlace[], days: number) {
  if (places.length === 0) return true;

  return places.getFilteredByDate(days).filter((place: VisitedPlace) => place.isCrowded).length === 0;
}

export default visitedPlaceReducer;
