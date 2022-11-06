import { GetTradesInStore, TradeFormValues } from "./types";

export const createTradeInitialValues: TradeFormValues = {
  time: 1,
  trade_price: 10,
};
export const tradeInitialValues: GetTradesInStore = {
  trades: [],
  loading: false,
  error: "",
};
