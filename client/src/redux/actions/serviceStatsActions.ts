import * as types from "./actionTypes";
import { CustomServiceStatAction } from "./customAction";
import { Action } from "redux";

export function beginServiceCall(serviceName: string): CustomServiceStatAction {
  return { type: types.SERVICE_BEGIN_CALL, service: serviceName, error: null };
}

export function serviceCallError(error: Error, serviceName: string): CustomServiceStatAction {
  return { type: types.SERVICE_CALL_ERROR, error: error, service: serviceName };
}
