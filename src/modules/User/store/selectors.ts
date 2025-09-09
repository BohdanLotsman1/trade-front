import { State } from "../../../libs/store/reducers";

export const getUserSelector = (state: State) => state.user.user;
