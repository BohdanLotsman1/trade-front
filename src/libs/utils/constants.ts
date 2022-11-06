export const JWT_LOCALSTORAGE_KEY = 'jwt';
export const APP_API_HOST = process.env.REACT_APP_API_HOST;
export const APP_URL = process.env.REACT_APP_URL;

export const dateFormat = "YYYY/MM/DD";


export const currencyEnum = {
  btcusdt:'BTC/USDT',
  ethbtc:'ETH/BTC',
  yfibtc:'YFI/BTC',
  dashbtc:'DASH/BTC',
  adabusd:'ADA/BUSD',
  ltcbusd:'LTC/BUSD',
  atombnb:'ATOM/BNB',
  lunausdt:'LUNA/USDT',
  xrpusdt: 'XRP/USDT',
  ethusdt: 'ETH/USDT',
  dotbusd: 'DOT/BUSD',
  dashbusd: 'DASH/BUSD',
  dashusdt: 'DASH/USDT',
  solusdt: 'SOL/USDT',
  solbtc: 'SOL/BTC',
  manausdt: 'MANA/USDT',
  manabusd: 'MANA/BUSD',
}

export const socketCurrEnum = {
  btcusdt:'btcusdt',
  ethbtc:'ethbtc',
  yfibtc:'yfibtc',
  dashbtc:'dashbtc',
  adabusd:'adabusd',
  ltcbusd:'ltcbusd',
  atombnb:'atombnb',
  lunausdt: 'lunausdt',
  xrpusdt: 'xrpusdt',
  ethusdt: 'ethusdt',
  dotbusd: 'dotbusd',
  dashbusd: 'dashbusd',
  dashusdt: 'dashusdt',
  solusdt: 'solusdt',
  solbtc: 'solbtc',
  manausdt: 'manausdt',
  manabusd: 'manabusd',
}

export let CurentPrice = {
  BTCUSDT: 0,
  ETHBTC: 0,
  YFIBTC: 0,
  DASHBTC: 0,
  ADABUSD: 0,
  LTCDUSD: 0,
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
}

export const socket = new WebSocket("ws://localhost:7000");