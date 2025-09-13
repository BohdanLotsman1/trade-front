import { Actions } from "../../../../libs/store/types";
import { call, put } from "redux-saga/effects";
import { AuthService, RegisterService } from "../../services";
import {
  loginUserError,
  loginUserSuccess,
  registerUserError,
  registerUserSuccess,
} from "../actions";
import { clearUserStore, getUserSuccess } from "../../../User/store/actions/";
import { logoutUserError, logoutUserSuccess } from "../actions/logoutActions";

const registerService = RegisterService.getInstance();
const authService = AuthService.getInstance();

export function* logining({ payload }: Actions) {
  try {
    const { data } = yield call(authService.login, payload);

    if (data?.message === undefined) {
      yield put(loginUserSuccess());
      yield put(getUserSuccess(data));
      window.location.href = "/";
    } else yield put(loginUserError([data.message]));
  } catch (error: any) {
    console.log(error);
    yield put(loginUserError([error.response.message]));
  }
}

export function* logout() {
  try {
    yield call(authService.logout);
    yield put(logoutUserSuccess());
    yield put(clearUserStore());
  } catch (error: any) {
    console.log(error);
    yield put(logoutUserError([error.response.data.message]));
  }
}

export function* registering({ payload }: Actions) {
  try {
    const { data } = yield call(registerService.register, payload);

    if (data.message === undefined) {
      yield put(registerUserSuccess());
      // window.location.href = `${process.env.PUBLIC_URL}/login`;
    } else {
      yield put(registerUserError([data.message]));
    }
  } catch (error: any) {
    yield put(registerUserError(error.response.errors));
  }
}
