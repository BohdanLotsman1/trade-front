import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Trade, TradeFormValues } from "../store/types";
import * as Yup from "yup";
import "./style.scss";
import { createTradeInitialValues } from "../store/initialState";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserSelector } from "../../User/store/selectors";
import { createTrade } from "../store/actions";
import {
  currentCandleSelector,
} from "../../Chart/store/selectors";
import classNames from "classnames";
import { setWallet } from "../../User/store/actions";
import { currencyEnum, CURRENCY_LOCALSTORAGE_KEY } from "../../../libs/utils/constants";

export const TradeForm = () => {
  const dispatch = useDispatch();
  const currentCandle = useSelector(currentCandleSelector);
  const currency = localStorage.getItem(CURRENCY_LOCALSTORAGE_KEY) ?? currencyEnum.adabusd;
  const user = useSelector(getUserSelector);
  const [direction, setDirection] = useState(false);
  const required = "This field is required";

  const BetValidationSchema = () =>
    Yup.object({
      time: Yup.number()
        .required(required)
        .label("Time")
        .min(1, "1 minute is a minimal diapazone"),
      trade_price: Yup.number()
        .required(required)
        .label("Price")
        .min(10, "10$ it's a minimal bet"),
    });

  const submitHandle = (values: TradeFormValues) => {
    if (user.wallet.amount_of_money) {
      const form: Trade = {
        time: values.time.toString(),
        trade_price: values.trade_price,
        currency: currency,
        direction: Number(direction),
        price_on_open: currentCandle.close,
        end_time: moment().add(values.time, "minutes").format(),
        state: "OPENED",
        user_id: user.id,
        wallet_id: user.wallet.id,
      };
      dispatch(createTrade(form));
      dispatch(
        setWallet({
          amount_of_money: user.wallet.amount_of_money - values.trade_price,
          id: user.wallet.id,
        })
      );
    }
   
  };

  const handleClick = (direction: boolean) => {
    setDirection(direction);
  };

  return (
    <div className="bet">
      <h1>Make your deal</h1>
      <Formik
        initialValues={createTradeInitialValues}
        validationSchema={BetValidationSchema()}
        onSubmit={submitHandle}
      >
        <Form className="form">
          <div className="bet-input">
            <span>Price $</span>
            <Field
              name="trade_price"
              placeholder="Bet"
              type="number"
              min={10}
              max={2000}
              className="form-input"
            />
            <ErrorMessage
              name="trade_price"
              component="div"
              className="error-message"
            />
          </div>

          <div className="bet-input">
            <span>Time(min.)</span>
            <Field
              name="time"
              placeholder="Time"
              type="number"
              min={1}
              max={100}
              className="form-input"
            />
            <ErrorMessage
              name="time"
              component="div"
              className="error-message"
            />
          </div>
          <div className="bet-buttons">
            <button
              type="submit"
              className={classNames("bet-buttons-buy", "bet-buttons-btn")}
              onClick={() => handleClick(true)}
            >
              BUY/LONG
            </button>
            <button
              type="submit"
              className={classNames("bet-buttons-sell", "bet-buttons-btn")}
              onClick={() => handleClick(false)}
            >
              SELL/SHORT
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
