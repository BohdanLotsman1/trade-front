import { Time } from "lightweight-charts";

export interface GetChartInStore {
  chartData: Array<Candle>;
  currentCurrency: string;
  socketCurrency: string;
  currentCandle: Candle;
  currPool: {
    BTCUSDT: number,
    ETHBTC: number,
    YFIBTC: number,
    DASHBTC: number,
    ADABUSD: number,
    LTCBUSD: number,
    ATOMBNB: number,
    LUNAUSDT: number,
    XRPUSDT: number,
    ETHUSDT: number,
    DOTBUSD: number,
    DASHBUSD: number,
    DASHUSDT: number,
    SOLUSDT: number,
    SOLBTC: number,
    MANAUSDT: number,
    MANABUSD: number,
  },
  loading: boolean;
  error: string;
}

export interface Candle {
  time: any;
  open: number;
  high: number;
  low: number;
  currency: string;
  close: number;
}
export interface BetFormValues {
    time: number,
    trade_price: number,
}