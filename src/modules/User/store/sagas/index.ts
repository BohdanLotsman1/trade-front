import { SagaIterator } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';
import {
    GET_USER,
    DELETE_USER,
    UPDATE_USER_INFO,
    UPDATE_USER_PASSWORD,  
    GET_WALLET,
    REFILL_WALLET
} from "../actionTypes";
import { 
    getAuthUser,
    deletingUser,
    updatingUserInfo,
    updatingUserPassword,   
    gettingWallet,
    refillingWallet
} from './userSaga';

export default function* userWatch(): SagaIterator {
    yield all([
        takeEvery(GET_USER, getAuthUser),
        takeEvery(DELETE_USER, deletingUser),
        takeEvery(UPDATE_USER_INFO, updatingUserInfo),
        takeEvery(UPDATE_USER_PASSWORD, updatingUserPassword),
        takeEvery(GET_WALLET, gettingWallet),
        takeEvery(REFILL_WALLET, refillingWallet),
    ]);
}
