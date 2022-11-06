export interface User {
  id: string;
  email: string;
  name: string;
}

export interface GetUserInStore {
  id: string;
  email: string;
  name: string;
  wallet: Wallet;
}

export interface Wallet {
  amount_of_money: number;
  id: string;
}
export interface changePasswordValues {
  old_password: string;
  password: string;
  password_confirmation: string;
}
