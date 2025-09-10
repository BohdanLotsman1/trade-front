export interface GetChartInStore {
  chartData: Array<Candle>;
  currentCurrency: string;
  currentCandle: Candle;
  currPool: {
    [key: string]: number;
  };
  loading: boolean;
  error: string;
}
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
