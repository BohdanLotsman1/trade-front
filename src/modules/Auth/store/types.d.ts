export interface RegistrationFormValues {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface SignUpStore {
    loading: boolean;
    errors: string[];
    isSuccess: boolean;
}

export interface SignInStore {
    loading: boolean;
    errors: string[];
    isSuccess: boolean;
    isAuth: boolean;
}

export interface LogoutStore {
    loading: boolean;
    errors: string[];
    isSuccess: boolean;
    isAuth: boolean;
}