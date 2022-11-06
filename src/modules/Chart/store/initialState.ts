import { GetChartInStore } from "./types";

export const chartInitialValues: GetChartInStore = {
    chartData: [],
    currentCurrency: '',
    socketCurrency: '',
    currentCandle: {
        time: 0,
        open: 0,
        high: 0,
        low: 0,
        currency: '',
        close: 0,
    },
    currPool: {
        BTCUSDT: 0,
        ETHBTC: 0,
        YFIBTC: 0,
        DASHBTC: 0,
        ADABUSD: 0,
        LTCBUSD: 0,
        ATOMBNB: 0,
        LUNAUSDT: 0,
        XRPUSDT: 0,
        ETHUSDT: 0,
        DOTBUSD: 0,
        DASHBUSD: 0,
        DASHUSDT: 0,
        SOLUSDT: 0,
        SOLBTC: 0,
        MANAUSDT: 0,
        MANABUSD: 0,
      },
      
    loading: false,
    error: '',
};