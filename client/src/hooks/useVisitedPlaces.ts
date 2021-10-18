import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { RootState } from "../redux/reducers";
import { VisitedPlace } from "../models";
import { TrackerDataPoints } from "../components/common";

const useVisitedPlaces = () => {
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

  const visitedPlaces = useSelector<VisitedPlace[]>(
    (state) => state.visitedPlace.visitedPlaces
  );

  const visitedPlacesByDate = useSelector<TrackerDataPoints[]>(
    (state) => state.visitedPlace.placeCountByDate
  );

  return {
    visitedPlaces,
    visitedPlacesByDate,
  };
};

export default useVisitedPlaces;
