import {LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCESS, LOGOUT_ERRORS_CLEAR} from "../actionTypes";
import {Actions, PayloadAction} from "../../../../libs/utils/store/types";

export const logoutUser = () => ({
    type: LOGOUT,
});

export const logoutUserError = (payload: string[]): PayloadAction<string[]> => ({
    type: LOGOUT_ERROR,
    payload,
});

export const logoutUserSuccess = (): Actions => ({
    type: LOGOUT_SUCCESS
});

export const cleanLogoutErrors = (): Actions => ({
    type: LOGOUT_ERRORS_CLEAR
});