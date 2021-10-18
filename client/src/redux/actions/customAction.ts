import { Action } from "redux";
import { SocialInteraction, VisitedPlace } from "../../models";
import { defaultSocialInteraction } from "../../models/defaultValues";

export interface CustomSocialInterAction extends Action {
  interaction: SocialInteraction;
  interactions: SocialInteraction[];
  days: number;
}

export interface CustomVisitedPlaceAction extends Action {
  places: VisitedPlace[];
  place: VisitedPlace;
  days: number;
}

export interface CustomServiceStatAction extends Action {
  error: Error | null;
  service: string;
}
