import { Actions } from "../../../../libs/store/types";
import {
  GET_CHART_HISTORY,
  GET_CHART_HISTORY_SUCCESS,
  SET_CURRENT_CURRENCY,
  GET_CHART_HISTORY_ERROR,
  SET_CANDLE_OBJECT,
  SET_CURRENCY_POOL,
  SET_TIME_INTERVAL,
} from "../actionTypes";
import { GetChartInStore } from "../types";
import { chartInitialValues } from "../initialState";
import { parsedChart } from "../../utils";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: GetChartInStore = chartInitialValues,
  { type, payload }: Actions
): GetChartInStore => {
  switch (type) {
    case GET_CHART_HISTORY:
      return {
        ...state,
        loading: true,
      };
    case SET_CANDLE_OBJECT:
      return {
        ...state,
        currentCandle: payload,
      };
    case GET_CHART_HISTORY_SUCCESS:
      return {
        ...state,
        chartData: parsedChart(payload ?? []),
        loading: false,
      };
    case SET_CURRENT_CURRENCY:
      return {
        ...state,
        currentCurrency: payload,
      };
    case GET_CHART_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SET_CURRENCY_POOL:
      return {
        ...state,
        currPool: payload,
      };
    case SET_TIME_INTERVAL:
      return {
        ...state,
        timeInterval: payload,
      };
    default:
      return state;
  }
};
