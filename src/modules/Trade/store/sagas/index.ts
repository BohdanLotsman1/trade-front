import { SagaIterator } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';
import {
    GET_TRADES,
    CREATE_TRADE,
    CLOSE_TRADE
} from "../actionTypes";
import { 
    gettingTrades, 
    creatingTrade,
    closingTrade,
} from './tradeSaga';

export default function* userWatch(): SagaIterator {
    yield all([
        takeEvery(GET_TRADES, gettingTrades),
        takeEvery(CREATE_TRADE, creatingTrade),
        takeEvery(CLOSE_TRADE, closingTrade),
    ]);
}
