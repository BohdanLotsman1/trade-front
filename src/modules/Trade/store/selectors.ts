import { State } from "../../../libs/store/reducers";

export const tradesSelector = (state: State) => state.trade.trade.trades;
export const tradesLoadingSelector = (state: State) =>
  state.trade.trade.loading;
export const tradesErrorSelector = (state: State) => state.trade.trade.error;
