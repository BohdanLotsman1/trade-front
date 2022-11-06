import {State} from "../../../libs/utils/store/reducers";

export const getUserSelector = (state: State) => state.user.user;