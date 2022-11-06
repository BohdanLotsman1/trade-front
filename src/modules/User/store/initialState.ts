import { 
    changePasswordValues, GetUserInStore,
} from "./types";

export const UserInitialValues: GetUserInStore = {
    id: '',
    email: '',
    name: '',
    wallet: {
        amount_of_money: 0,
        id: '',
    },
};

export const changePasswordInitialValues: changePasswordValues = {
    old_password: '',
    password: '',
    password_confirmation: '',
}
