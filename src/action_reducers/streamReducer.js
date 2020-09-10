import _ from "lodash";
import {
  CREATE_STREAM,
  CREATE_STREAM_FAILED,
  FETCH_STREAMS,
  FETCH_SINGLE_STREAM,
  EDIT_STREAM,
  EDIT_STREAM_FAILED,
  DELETE_STREAM,
} from "../actions/types";

export function streams(state = {}, action) {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_SINGLE_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM_FAILED:
    case CREATE_STREAM_FAILED:
      return { ...state, editError: action.payload.error };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
