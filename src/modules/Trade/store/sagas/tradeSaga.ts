import { Actions } from "../../../../libs/utils/store/types";
import { call, put } from "redux-saga/effects";
import { TradeService } from "../../services";
import {
  setTradeError,
  createTradeSuccess,
  getTradesSuccess,
} from "../actions";
import { setWallet } from "../../../User/store/actions";

const chartService = TradeService.getInstance();

export function* gettingTrades({ payload }: Actions) {
  try {
    const { data } = yield call(chartService.getTrades, payload);
    if (data) {
      yield put(getTradesSuccess(data));
    }
  } catch (e) {
    yield put(setTradeError("get history error"));
  }
}

export function* closingTrade({ payload }: Actions) {
  try {
    const { data } = yield call(chartService.closeTrade, payload);
    if (data) {
      yield put(getTradesSuccess(data.trades));
      yield put(setWallet(data.wallet));
    }
  } catch (e) {
    yield put(setTradeError("close trade error"));
  }
}

export function* creatingTrade({ payload }: Actions) {
  try {
    const { data } = yield call(chartService.createTrade, payload);
    if (data) {
      yield put(createTradeSuccess(data));
    }
  } catch (e) {
    console.log(e);

    yield put(setTradeError("create trade error"));
  }
}
