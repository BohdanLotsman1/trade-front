import { GetChartInStore } from "./types";

export const chartInitialValues: GetChartInStore = {
  chartData: [],
  currentCurrency: "",
  currentCandle: {
    time: 0,
    open: 0,
    high: 0,
    low: 0,
    currency: "",
    close: 0,
    volume: 0,
  },
  currPool: [],
  loading: false,
  error: "",
};
