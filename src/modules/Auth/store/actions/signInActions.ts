import {SIGN_IN, SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_IN_ERRORS_CLEAR} from "../actionTypes";
import {Actions, PayloadAction} from "../../../../libs/utils/store/types";
import {LoginFormValues} from "../types";

export const loginUser = (form: LoginFormValues) => ({
    type: SIGN_IN,
    payload: form,
});

export const loginUserError = (payload: string[]): PayloadAction<string[]> => ({
    type: SIGN_IN_ERROR,
    payload,
});

export const loginUserSuccess = (): Actions => ({
    type: SIGN_IN_SUCCESS
});

export const cleanLoginErrors = (): Actions => ({
    type: SIGN_IN_ERRORS_CLEAR
});