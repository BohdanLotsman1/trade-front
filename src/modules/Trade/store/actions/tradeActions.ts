import { Actions } from "../../../../libs/utils/store/types";
import {
  CLOSE_TRADE,
  CREATE_TRADE,
  CREATE_TRADE_SUCCESS,
  GET_TRADES,
  GET_TRADES_SUCCESS,
  SET_ERROR,
} from "../actionTypes";
import { Trade } from "../types";

export const getTrades = (payload: string): Actions => ({
  type: GET_TRADES,
  payload,
});

export const closeTrade = (payload: string): Actions => ({
  type: CLOSE_TRADE,
  payload,
});

export const getTradesSuccess = (payload: Array<Trade>): Actions => ({
  type: GET_TRADES_SUCCESS,
  payload,
});

export const createTrade = (payload: Trade): Actions => ({
  type: CREATE_TRADE,
  payload,
});

export const createTradeSuccess = (payload: Trade): Actions => ({
  type: CREATE_TRADE_SUCCESS,
  payload,
});

export const setTradeError = (payload: string): Actions => ({
  type: SET_ERROR,
  payload,
});
