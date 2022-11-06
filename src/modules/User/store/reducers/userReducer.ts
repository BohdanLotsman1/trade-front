import { Actions } from "../../../../libs/utils/store/types";
import {
  GET_USER,
  SET_WALLET,
  SET_USER,
  UPDATE_USER,
} from "../actionTypes";
import { GetUserInStore } from "../types";
import { UserInitialValues } from "../initialState";

export default (
  state: GetUserInStore = UserInitialValues,
  { type, payload }: Actions
): GetUserInStore => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
      };
    case SET_USER:
      return {
        ...state,
        id: payload.user.id,
        email: payload.user.email,
        name: payload.user.name,
        wallet: payload.wallet,
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
