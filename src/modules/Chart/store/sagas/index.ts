import { SagaIterator } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';
import {
    GET_CHART_HISTORY
} from "../actionTypes";
import { 
    gettingChartHistory, 
} from './chartSaga';

export default function* userWatch(): SagaIterator {
    yield all([
        takeEvery(GET_CHART_HISTORY, gettingChartHistory),
    ]);
}
