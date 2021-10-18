import { SocialInteraction, VisitedPlace } from ".";

const DEFAULT_DATE: Date = new Date(2000, 1, 1);

const defaultSocialInteraction: SocialInteraction = {
  _id: "",
  name: "",
  hours: 0,
  date: DEFAULT_DATE,
  isSocialDistancing: false,
};

const defaultVisitedPlace: VisitedPlace = {
  _id: "",
  place: "",
  hours: 0,
  date: DEFAULT_DATE,
  isCrowded: false,
};

export { defaultSocialInteraction, defaultVisitedPlace };
