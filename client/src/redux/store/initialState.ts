import { StoreState } from "./StoreState";

const initialState: StoreState = {
  socialInteractions: [],
  filteredSocialInteractions: [],
  interactionCountByDate: [],
  socialInteractionServiceCallStarted: false,
  socialDistancingPracticed: false,
  distinctNames: [],

  visitedPlaces: [],
  filteredVisitedPlaces: [],
  placeCountByDate: [],
  visitedPlaceServiceCallStarted: false,
  noVisitedCrowdedPlace: false,
  distinctPlaces: [],

  serviceCallsInProgress: 0,
  error: null,
};

export default initialState;
