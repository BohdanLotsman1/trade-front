import { Actions } from '../../../../libs/utils/store/types';
import {REGISTER, REGISTER_ERROR, REGISTER_SUCCESS} from "../actionTypes";
import {SignUpStore} from "../types";
import {SignUpInitStore} from "../initialState";

export default (state: SignUpStore = SignUpInitStore, { type, payload }: Actions): SignUpStore => {
    switch (type) {
        case REGISTER:
            return {
                ...state,
                loading: true,
                errors: [],
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: [],
                isSuccess: true,
            };
        case REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload,
                isSuccess: false,
            };
        default:
            return state;
    }
};
