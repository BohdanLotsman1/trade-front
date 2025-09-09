import { Actions } from "../../../../libs/store/types";
import {
  GET_USER,
  SET_WALLET,
  UPDATE_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "../actionTypes";
import { GetUserInStore } from "../types";
import { UserInitialValues } from "../initialState";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: GetUserInStore = UserInitialValues,
  { type, payload }: Actions
): GetUserInStore => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...payload.user,
        loading: false,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        id: payload.id,
        email: payload.email,
        name: payload.name,
      };
    case SET_WALLET:
      return { ...state, wallet: payload };
    default:
      return state;
  }
};
