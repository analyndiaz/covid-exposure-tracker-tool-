import * as handlers from "./utils/serviceHandlers";
import { VisitedPlace } from "../models";

// const baseUrl =
//   "https://magenic-covid-tracker-api.herokuapp.com/api" + "/visited-places/";

const baseUrl = "http://localhost:5000/api/visited-places/";
export function getAllVisitedPlaces() {
  return handlers.getAll(baseUrl);
}

export function saveVisitedPlace(vistedPlace: VisitedPlace) {
  return handlers.save({
    method: vistedPlace._id ? "PUT" : "POST",
    url: baseUrl + (vistedPlace._id ? vistedPlace._id : ""),
    data: vistedPlace,
  });
}

export function deleteVisitedPlace(placeId: string) {
  return handlers.remove(baseUrl + placeId);
}
