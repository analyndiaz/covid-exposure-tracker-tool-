import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "../redux/reducers";

const useService = () => {
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
  const loading =
    useSelector<number>((state) => state.serviceStats.serviceCallsInProgress) >
    0;

  const interactionServiceCallStarted = useSelector<boolean>(
    (state) => state.serviceStats.socialInteractionServiceCallStarted
  );

  const placeServiceCallStarted = useSelector<boolean>(
    (state) => state.serviceStats.visitedPlaceServiceCallStarted
  );

  const errors = useSelector<Error | null>((state) => state.serviceStats.error);

  return {
    loading,
    interactionServiceCallStarted,
    placeServiceCallStarted,
    errors,
  };
};

export default useService;
