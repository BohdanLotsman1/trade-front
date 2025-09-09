import { all } from "redux-saga/effects";
import { authWatch } from "../../../../modules/Auth/store";
import { chartWatch } from "../../../../modules/Chart/store";
import { tradeWatch } from "../../../../modules/Trade/store";
import { userWatch } from "../../../../modules/User/store";

export default function* IndexSagas() {
  yield all([authWatch(), userWatch(), chartWatch(), tradeWatch()]);
}
