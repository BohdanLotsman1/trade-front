import { Actions, rootState } from '../types';
import {rootActionTypes} from "../actionTypes";

const initialState: rootState = {
    isActive : false,
    goalModalForm : ''
}

export default (state: rootState = initialState, { type, payload }: Actions): rootState => {
    switch (type) {
        case rootActionTypes.SET_ACTIVE:
            return {
                ...state,
                isActive: payload
            }
        case rootActionTypes.SET_GOAL_MODAL_FORM:
            return {
                ...state,
                goalModalForm: payload
            }
        default:
            return state
    }
};
