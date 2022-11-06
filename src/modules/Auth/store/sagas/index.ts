import { SagaIterator } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';
import {
    LOGOUT,
    REGISTER,
    SIGN_IN
} from "../actionTypes";
import {
    registering,
    logining,
    logout
} from './authSaga';

export default function* authWatch(): SagaIterator {
    yield all([
        takeEvery(REGISTER, registering),
        takeEvery(SIGN_IN, logining),
        takeEvery(LOGOUT, logout)
    ]);
}
