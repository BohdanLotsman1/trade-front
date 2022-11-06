import { Actions } from "../../../../libs/utils/store/types";
import {
  GET_CHART_HISTORY,
  SET_CHART_HISTORY,
  GET_CHART_HISTORY_SUCCESS,
  SET_CURRENT_CURRENCY,
  SET_CHART_HISTORY_ERROR,
  SET_CURRENT_SOCKET_CURRENCY,
  SET_CANDLE_OBJECT,
  SET_CURRENCY_POOL_ITEM,
} from "../actionTypes";
import { GetChartInStore } from "../types";
import { chartInitialValues } from "../initialState";

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
    case SET_CHART_HISTORY:
      return {
        ...state,
        chartData: [...state.chartData, payload],
      };
    case GET_CHART_HISTORY_SUCCESS:
      return {
        ...state,
        chartData: payload,
        loading: false,
      };
    case SET_CURRENT_CURRENCY:
      return {
        ...state,
        currentCurrency: payload,
      };
    case SET_CURRENT_SOCKET_CURRENCY:
      return {
        ...state,
        socketCurrency: payload,
      };
    case SET_CHART_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case  SET_CURRENCY_POOL_ITEM: 
    return {
      ...state,
        currPool: {...state.currPool, [payload.currency as keyof typeof state.currPool]: payload.value}
    }
    default:
      return state;
  }
};
