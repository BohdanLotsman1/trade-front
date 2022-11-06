import { Actions } from '../../../../libs/utils/store/types';
import {SIGN_IN, SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_IN_ERRORS_CLEAR} from "../actionTypes";
import {SignInStore} from "../types";
import {SignInInitStore} from "../initialState";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: SignInStore = SignInInitStore, { type, payload }: Actions): SignInStore => {
    switch (type) {
        case SIGN_IN:
            return {
                ...state,
                loading: true,
                errors: [],
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: [],
                isSuccess: true,
                isAuth: true
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                loading: false,
                errors: [
                    ...state.errors,
                    ...payload
                ],
                isSuccess: false,
            };
        case SIGN_IN_ERRORS_CLEAR:
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