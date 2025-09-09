import { Actions, PayloadAction } from "../../../../libs/store/types";
import {
  GET_CHART_HISTORY,
  GET_CHART_HISTORY_ERROR,
  GET_CHART_HISTORY_SUCCESS,
  SET_CURRENT_CURRENCY,
  SET_CURRENT_SOCKET_CURRENCY,
  SET_CANDLE_OBJECT,
  SET_CURRENCY_POOL_ITEM,
} from "../actionTypes";
import { Candle, GetHistoryParams } from "../types";

export const getChartHistory = (payload: GetHistoryParams): Actions => ({
  type: GET_CHART_HISTORY,
  payload,
});

export const setCandleObject = (payload: Candle): Actions => ({
  type: SET_CANDLE_OBJECT,
  payload,
});

export const getChartHistorySuccess = (payload: string): Actions => ({
  type: GET_CHART_HISTORY_SUCCESS,
  payload,
});

export const setCurrencyPoolItem = (payload: {
  currency: string;
  value: number;
}): Actions => ({
  type: SET_CURRENCY_POOL_ITEM,
  payload,
});

export const setChartHistoryError = (
  payload: string
): PayloadAction<string> => ({
  type: GET_CHART_HISTORY_ERROR,
  payload,
});

export const setCurrentCurrency = (payload: string): PayloadAction<string> => ({
  type: SET_CURRENT_CURRENCY,
  payload,
});

export const setSocketCurrency = (payload: string): PayloadAction<string> => ({
  type: SET_CURRENT_SOCKET_CURRENCY,
  payload,
});
