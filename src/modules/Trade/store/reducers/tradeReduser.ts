import { Actions } from "../../../../libs/utils/store/types";
import {
SET_ERROR,
GET_TRADES_SUCCESS,
CREATE_TRADE_SUCCESS,
GET_TRADES,
CLOSE_TRADE,
} from "../actionTypes";
import { GetTradesInStore } from "../types";
import { tradeInitialValues } from "../initialState";

export default (
  state: GetTradesInStore = tradeInitialValues,
  { type, payload }: Actions
): GetTradesInStore => {
  switch (type) {
    case GET_TRADES:
      return {
        ...state,
        loading: true,
      };
    case GET_TRADES_SUCCESS:
      return {
        ...state,
        trades: payload,
        loading: false,
      };
    case CREATE_TRADE_SUCCESS:
      return {
        ...state,
        trades: [...state.trades, payload],
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
