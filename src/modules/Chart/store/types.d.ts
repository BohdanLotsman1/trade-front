export interface GetChartInStore {
  chartData: Array<Candle>;
  currentCurrency: string;
  timeInterval: TimeInterval;
  currentCandle: Candle;
  currPool: Array<{
    currency: string;
    value: number;
  }>;
  loading: boolean;
  error: string;
}
export type TimeInterval = "1m" | "15m" | "1h" | "4h" | "1d" | "1w";
export interface GetHistoryParams {
  currency: string;
  interval?: string;
  endTime?: number;
}
export interface Candle {
  time: any;
  open: number;
  high: number;
  low: number;
  currency: string;
  close: number;
  volume: number;
}
export interface BetFormValues {
  time: number;
  trade_price: number;
}

export interface ListedCurrenciesStorage {
  expireTime: number;
  currencies: Array<{ symbol: string; title: string }>;
}
export interface ListedCurrency {
  symbol: string;
  base: string;
  quote: string;
  marginRatio: string;
  isTradeAllowed: boolean;
  isBuyAllowed: boolean;
  isSellAllowed: boolean;
  isBaseBorrowable: boolean;
  isQuoteBorrowable: boolean;
  isBaseTransferIn: boolean;
  isQuoteTransferIn: boolean;
  status: string;
  delistTime: null;
  listOpenTime: null;
  isPublic: boolean;
}
