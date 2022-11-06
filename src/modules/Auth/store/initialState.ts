import {RegistrationFormValues, LoginFormValues, SignUpStore, SignInStore} from "./types";

export const registrationInitialValues: RegistrationFormValues = {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
};

export const loginInitialValues: LoginFormValues = {
    email: '',
    password: '',
}

export const SignUpInitStore: SignUpStore = {
    loading: false,
    errors: [],
    isSuccess: false,
};

export const SignInInitStore: SignInStore = {
    loading: false,
    errors: [],
    isSuccess: false,
    isAuth: false
};

export const LogoutInitStore: SignInStore = {
    loading: false,
    errors: [],
    isSuccess: false,
    isAuth: true
};