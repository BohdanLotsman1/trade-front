import { Actions } from "../../../../libs/utils/store/types";
import { call, put } from "redux-saga/effects";
import { setUser, getUserError, updateUser, setWallet } from "../actions";
import { UserService } from "../../services";

const userService = UserService.getInstance();

export function* getAuthUser() {
  try {
    const { data } = yield call(userService.getAuthUserByToken);

    if (data) {
      yield put(setUser(data));
    }
  } catch (error: any) {
    if (error.statusCode === 401) {
      window.location.href = `${process.env.REACT_APP_URL}/login`;
    }
    yield put(getUserError([error.response.data.message]));
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
      yield put(setWallet(data))
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
