// import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import IndexSagas from "./sagas";

// export const history = createBrowserHistory({
//   basename: process.env.PUBLIC_URL,
// });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(IndexSagas);

export default store;
