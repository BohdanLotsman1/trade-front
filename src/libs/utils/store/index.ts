import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { createLoadMiddleware } from "redux-load-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import IndexSagas from "./sagas";

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

const loadMiddleware = createLoadMiddleware();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(),
  composeWithDevTools(applyMiddleware(loadMiddleware, sagaMiddleware))
);

sagaMiddleware.run(IndexSagas);

export default store;
