export interface Actions {
  type: string;
  payload?: any;
  meta?: any;
}

export interface PayloadAction<T> {
  type: string;
  payload?: T;
  meta?: any;
}

export interface rootState {
  isActive: boolean;
  goalModalForm: string;
}

interface setActiveAction {
  type: OtherActionTypes.SET_ACTIVE;
  payload: boolean;
}

interface setGoalModalFormAction {
  type: OtherActionTypes.SET_GOAL_MODAL_FORM;
  payload: string;
}

export type modalAction = setActiveAction | setGoalModalFormAction;
