import { REGISTER, REGISTER_ERROR, REGISTER_SUCCESS } from "../actionTypes";
import { Actions, PayloadAction } from "../../../../libs/store/types";
import { RegistrationData } from "../types";

export const registerUser = (form: RegistrationData) => ({
  type: REGISTER,
  payload: form,
});

export const registerUserError = (
  payload: string[]
): PayloadAction<string[]> => ({
  type: REGISTER_ERROR,
  payload,
});

export const registerUserSuccess = (): Actions => ({
  type: REGISTER_SUCCESS,
});
