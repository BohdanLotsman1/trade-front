import { State } from "../../../libs/store/reducers";

export const signInErrorsSelector = (state: State) => state.auth.signIn.errors;

export const signUpErrorsSelector = (state: State) => state.auth.signUp.errors;
