import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Trade, TradeFormValues } from "../store/types";
import { createTradeInitialValues } from "../store/initialState";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserSelector } from "../../User/store/selectors";
import { createTrade } from "../store/actions";
import {
  currencySelector,
  currentCandleSelector,
} from "../../Chart/store/selectors";
import { setWallet } from "../../User/store/actions";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";
import { BetValidationSchema } from "../../../libs/utils/validations";
import { FormikTextField } from "../../../libs/ui/components/FormInput";

export const TradeForm = () => {
  const dispatch = useDispatch();
  const currentCandle = useSelector(currentCandleSelector);
  const currency = useSelector(currencySelector);
  const user = useSelector(getUserSelector);
  const [direction, setDirection] = useState(false);

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
      dispatch(createTrade(form) as any);
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
    <Box
      sx={{
        boxShadow: "0px 0px 2px 2px #00000029",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        padding: 1,
        borderRadius: "5px",
        gridRowStart: 1,
        gridRowEnd: 5,
      }}
    >
      <Formik
        initialValues={createTradeInitialValues}
        validationSchema={BetValidationSchema()}
        onSubmit={submitHandle}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FormikTextField
            name="trade_price"
            placeholder="Bet"
            label="Bet($)"
            type="number"
            inputMode="decimal"
            slotProps={{
              htmlInput: {
                min: 10,
                step: "any",
                inputMode: "decimal",
                max: 2000,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end" disablePointerEvents>
                    $
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormikTextField
            name="time"
            placeholder="Time"
            label="Time(min.)"
            type="number"
            inputMode="decimal"
            sx={{ width: "100%" }}
            slotProps={{
              htmlInput: {
                min: 1,
                step: "any",
                inputMode: "decimal",
                max: 100,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end" disablePointerEvents>
                    min.
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#25a59a",
                color: "white",
                gap: 1,
              }}
              onClick={() => handleClick(true)}
            >
              <Typography variant="button">BUY/LONG</Typography>
              <TrendingUp sx={{ fontSize: 20 }} />
            </Button>
            <Button
              type="submit"
              sx={{ backgroundColor: "#f0534f", color: "white", gap: 1 }}
              onClick={() => handleClick(false)}
            >
              <Typography variant="button">SELL/SHORT</Typography>
              <TrendingDown sx={{ fontSize: 20 }} />
            </Button>
          </Box>
        </Form>
      </Formik>
      <Box
        sx={{
          padding: 2,
          flex: 1,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "8px",
          border: "1px dashed #00000029",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: 600 }} typography={"h6"}>
          AI
        </Typography>
        <Typography sx={{ color: "white" }}>Coming soon</Typography>
      </Box>
    </Box>
  );
};
