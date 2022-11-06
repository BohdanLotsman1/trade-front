import {Actions, PayloadAction} from "../../../../libs/utils/store/types";
import {
    SET_USER,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    GET_USER_ERRORS_CLEAR,
    UPDATE_USER,
    UPDATE_USER_INFO,
    DELETE_USER,
    UPDATE_USER_PASSWORD,
    GET_WALLET,
    SET_WALLET,
    REFILL_WALLET
} from "../actionTypes";
import { Wallet } from "../types";

export const getUser = (): Actions => ({
    type: GET_USER,
});

export const setUser = (payload: any): PayloadAction<string[]> => ({
    type: SET_USER,
    payload,
});

export const getUserError = (payload: string[]): PayloadAction<string[]> => ({
    type: GET_USER_ERROR,
    payload,
});

export const getUserSuccess = (): Actions => ({
    type: GET_USER_SUCCESS
});

export const refillWallet = (payload: string): Actions => ({
    type: REFILL_WALLET,
    payload
});

export const cleanGetUserErrors = (): Actions => ({
    type: GET_USER_ERRORS_CLEAR
});

export const updateUser = (payload: any): PayloadAction<string[]> => ({
    type: UPDATE_USER,
    payload,
});

export const updateUserInfo = (payload: any): PayloadAction<string[]> => ({
    type: UPDATE_USER_INFO,
    payload,
});

export const getWallet = (payload: string): PayloadAction<string> => ({
    type: GET_WALLET,
    payload,
});

export const setWallet = (payload: Wallet) => ({
    type: SET_WALLET,
    payload,
});

export const deleteUser = (payload: any): PayloadAction<string[]> => ({
    type: DELETE_USER,
    payload
});

export const updateUserPassword = (payload: any): PayloadAction<string[]> => ({
    type: UPDATE_USER_PASSWORD,
    payload
});