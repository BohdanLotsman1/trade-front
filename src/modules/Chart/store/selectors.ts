import {State} from "../../../libs/utils/store/reducers";

export const currencySelector = (state: State) => state.chart.chart.currentCurrency;
export const socketCurrencySelector = (state: State) => state.chart.chart.socketCurrency;
export const chartDataSelector = (state: State) => state.chart.chart.chartData;
export const currentCandleSelector = (state: State) => state.chart.chart.currentCandle;
export const loadingSelector = (state: State) => state.chart.chart.loading;
export const currencyPoolSelector = (state: State) => state.chart.chart.currPool;