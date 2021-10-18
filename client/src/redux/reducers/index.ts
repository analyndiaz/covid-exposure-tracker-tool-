import { combineReducers } from "redux";
import socialInteraction from "./socialInteractionReducer";
import visitedPlace from "./visitedPlaceReducer";
import serviceStats from "./serviceStatsReducer";

export const rootReducer = combineReducers({
  socialInteraction,
  visitedPlace,
  serviceStats,
});

export type RootState = ReturnType<typeof rootReducer>;
