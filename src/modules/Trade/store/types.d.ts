import { Time } from "lightweight-charts";

export interface GetTradesInStore {
  trades: Array<Trade>;
  loading: boolean;
  error: string;
}
export interface Trade {
  id?: string;
  trade_price: number;
  direction: number;
  user_id: string;
  state: string;
  wallet_id: string;
  price_on_close?: number;
  result?: string;
  price_on_open: number;
  time: string;
  end_time: string;
  currency: string;
  created_at?: string;
}
export interface TradeFormValues {
  time: number;
  trade_price: number;
}
