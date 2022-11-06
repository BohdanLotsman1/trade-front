import { Actions } from '../../../../libs/utils/store/types';
import {LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR, LOGOUT_ERRORS_CLEAR} from "../actionTypes";
import {LogoutStore} from "../types";
import {LogoutInitStore} from "../initialState";

export default (state: LogoutStore = LogoutInitStore, { type, payload }: Actions): LogoutStore => {
    switch (type) {
        case LOGOUT:
            return {
                ...state,
                loading: true,
                errors: [],
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: [],
                isSuccess: true,
                isAuth: false
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                loading: false,
                errors: [
                    ...state.errors,
                    ...payload
                ],
                isSuccess: false,
            };
        case LOGOUT_ERRORS_CLEAR:
            return {
                ...state,
                loading: false,
                errors: [],
                isSuccess: false,
            };
        default:
            return state;
    }
};