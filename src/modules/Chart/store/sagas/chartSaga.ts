import { Actions } from "../../../../libs/utils/store/types";
import { call, put } from "redux-saga/effects";
import { ChartService } from "../../services";
import { getChartHistorySuccess, setCandleObject, setChartHistoryError } from "../actions";

const chartService = ChartService.getInstance();

export function* gettingChartHistory({ payload }: Actions) {
  try {
    const { data } = yield call(chartService.getChartHistory, payload);
    if (data?.history) {
        yield put(getChartHistorySuccess(data.history))
        yield put(setCandleObject(data.history[data.history?.length - 1]))
    }
  } catch (e) {
      console.log(e);
      
    yield put(setChartHistoryError('get history error'))
  }
}

