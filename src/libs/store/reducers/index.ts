import { combineReducers } from "redux";

import { store as authStore } from "../../../modules/Auth";
import { store as userStore } from "../../../modules/User";
import { store as chartStore } from "../../../modules/Chart";
import { store as tradeStore } from "../../../modules/Trade";

const reducer = combineReducers({
  auth: authStore.reducers,
  user: userStore.reducers,
  chart: chartStore.reducers,
  trade: tradeStore.reducers,
});

export type State = ReturnType<typeof reducer>;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => reducer;
