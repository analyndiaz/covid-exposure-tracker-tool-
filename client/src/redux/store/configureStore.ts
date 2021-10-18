import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { rootReducer } from "../reducers";
import thunk from "redux-thunk";
import socialInteractionReducer from "../reducers/socialInteractionReducer";

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
