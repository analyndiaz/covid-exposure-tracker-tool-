import { SocialInteraction, VisitedPlace } from "../../models";
import TrackerDataPoints from "../../components/common/graphs/TrackerDataPoints";

export interface StoreState {
  // Social Interactions
  socialInteractions: SocialInteraction[];
  filteredSocialInteractions: SocialInteraction[];
  socialDistancingPracticed: boolean;
  interactionCountByDate: TrackerDataPoints[];
  socialInteractionServiceCallStarted: boolean;
  distinctNames: string[];

  // Visited Places
  visitedPlaces: VisitedPlace[];
  noVisitedCrowdedPlace: boolean;
  filteredVisitedPlaces: VisitedPlace[];
  placeCountByDate: TrackerDataPoints[];
  visitedPlaceServiceCallStarted: boolean;
  distinctPlaces: string[];

  // Service stats
  serviceCallsInProgress: number;
  error: Error | null;
}
