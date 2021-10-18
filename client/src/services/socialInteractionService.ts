import * as handlers from "./utils/serviceHandlers";
import { SocialInteraction } from "../models";

// const baseUrl =
//   "https://magenic-covid-tracker-api.herokuapp.com/api" +
//   "/social-interactions/";

const baseUrl = "http://localhost:5000/api/social-interactions/";

export function getAllSocialInteractions() {
  return handlers.getAll(baseUrl);
}

export function saveSocialInteraction(socialInteraction: SocialInteraction) {
  return handlers.save({
    method: socialInteraction._id ? "PUT" : "POST",
    url: baseUrl + (socialInteraction._id ? socialInteraction._id : ""),
    data: socialInteraction,
  });
}

export function deleteSocialInteraction(interactionId: string) {
  return handlers.remove(baseUrl + interactionId);
}
