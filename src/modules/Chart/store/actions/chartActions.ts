import { Actions, PayloadAction } from "../../../../libs/store/types";
import {
  GET_CHART_HISTORY,
  GET_CHART_HISTORY_ERROR,
  GET_CHART_HISTORY_SUCCESS,
  SET_CURRENT_CURRENCY,
  SET_CANDLE_OBJECT,
  SET_CURRENCY_POOL,
  GET_LISTED_CURRENCIES,
  GET_LISTED_CURRENCIES_SUCCESS,
  GET_LISTED_CURRENCIES_ERROR,
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

export const setCurrencyPool = (payload: {
  [key: string]: number;
}): Actions => ({
  type: SET_CURRENCY_POOL,
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

export const getListedCurrencies = (
  payload: string
): PayloadAction<string> => ({
  type: GET_LISTED_CURRENCIES,
  payload,
});

export const getListedCurrenciesSuccess = (
  payload: string
): PayloadAction<string> => ({
  type: GET_LISTED_CURRENCIES_SUCCESS,
  payload,
});

export const getListedCurrenciesError = (
  payload: string
): PayloadAction<string> => ({
  type: GET_LISTED_CURRENCIES_ERROR,
  payload,
});
