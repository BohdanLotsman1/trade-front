import {rootActionTypes} from "../actionTypes";
import {modalAction} from "../types";

export const setActive = (isActive : boolean): modalAction => ({
    type: rootActionTypes.SET_ACTIVE,
    payload: isActive
});

export const setGoalModalForm = (goal : string): modalAction => ({
    type: rootActionTypes.SET_GOAL_MODAL_FORM,
    payload: goal
});
