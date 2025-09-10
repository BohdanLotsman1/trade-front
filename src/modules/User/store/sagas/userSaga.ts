import { Actions } from "../../../../libs/store/types";
import { call, put } from "redux-saga/effects";
import {
  getUserError,
  updateUser,
  setWallet,
  getUserSuccess,
  getMe,
} from "../actions";
import { UserService } from "../../services";
import { getTrades } from "../../../Trade/store/actions";
import { AuthService } from "../../../Auth/services";
import { redirect } from "react-router";

const userService = UserService.getInstance();
const authService = AuthService.getInstance();

export function* getAuthUser() {
  try {
    const { data } = yield call(userService.getAuthUser);

    if (data) {
      yield put(getUserSuccess(data));
      yield put(getTrades(data.user.id) as any);
    }
  } catch (error: any) {
    console.log("Error fetching auth user:", error);

    if (error.status === 401) {
      console.log("Attempting to refresh token...");

      try {
        yield call(authService.refreshToken);
        const { data } = yield call(userService.getAuthUser);

        if (data) {
          yield put(getMe());
          yield put(getTrades(data.user.id) as any);
        }
      } catch (e) {
        console.log("Error refreshing token:", e);
        redirect("/login");
        // window.location.href = `${process.env.REACT_APP_URL}/login`;
      }
    }

    yield put(getUserError([error?.message]));
  }
}

export function* deletingUser({ payload }: Actions) {
  try {
    yield call(userService.deleteUser, payload);
  } catch (e) {
    console.log(e);
  }
}

export function* refillingWallet({ payload }: Actions) {
  try {
    const { data } = yield call(userService.refillWallet, payload);
    if (data) {
      yield put(setWallet(data));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* gettingWallet({ payload }: Actions) {
  try {
    const { data } = yield call(userService.getWallet, payload);
    if (data) {
      yield put(setWallet(data));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* updatingUserInfo({ payload }: Actions) {
  try {
    const { data } = yield call(
      userService.updateUserInfo,
      payload,
      payload.id
    );
    yield put(updateUser(data));
  } catch (e) {
    console.log(e);
  }
}

export function* updatingUserPassword({ payload }: Actions) {
  try {
    const { data } = yield call(
      userService.updUserPassword,
      payload.id,
      payload
    );
    if (data.message === "Success") {
      alert(data.message);
    } else {
      alert(data.message);
    }
  } catch (e) {
    console.log(e);
  }
}
