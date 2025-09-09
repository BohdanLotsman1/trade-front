import React, { useContext } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import {
  CURRENCY_LOCALSTORAGE_KEY,
  currencyEnum,
  SOCKET_CURRENCY_LOCALSTORAGE_KEY,
} from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCurrency,
  setSocketCurrency,
} from "../../../../modules/Chart/store/actions";
import { currencySelector } from "../../../../modules/Chart/store/selectors";
import { WebSocketContext } from "../SocketContext";

export const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const { socket } = useContext<any>(WebSocketContext);

  const handleClick = (currency: string) => {
    console.log(socket);

    const socketCurrency = currency.replace("/", "").toLowerCase();
    socket.send(socketCurrency);
    dispatch(setCurrentCurrency(currency) as any);
    dispatch(setSocketCurrency(socketCurrency) as any);
    localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, currency);
    localStorage.setItem(SOCKET_CURRENCY_LOCALSTORAGE_KEY, socketCurrency);
  };

  return (
    <Autocomplete
      sx={{
        border: "none",
        width: 170,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #292929ff",
        },
        "& .MuiOutlinedInput-root": {
          padding: 0,
        },
      }}
      disableClearable
      value={currency}
      onChange={(_: any, newValue: string | null) => {
        if (newValue) {
          handleClick(newValue);
        }
      }}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField {...params} />
      )}
      options={Object.values(currencyEnum)}
    />
  );
};
