import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CurentPrice,
  currencyEnum,
  CURRENCY_LOCALSTORAGE_KEY,
  socket,
  SOCKET_CURRENCY_LOCALSTORAGE_KEY,
} from "../../../../libs/utils/constants";
import {
  setCurrentCurrency,
  setSocketCurrency,
} from "../../../Chart/store/actions";
import { getUserSelector } from "../../../User/store/selectors";
import { getTrades } from "../../store/actions";
import { tradesLoadingSelector, tradesSelector } from "../../store/selectors";
import { ClosedTrades } from "./ClosedTrades/ClosedTrades";
import { OpenedTrades } from "./OpenedTrades/OpenedTrades";

export const TradeHistory = () => {
  const dispatch = useDispatch();
  const loading = useSelector(tradesLoadingSelector);
  const trades = useSelector(tradesSelector);
  const user = useSelector(getUserSelector);

  useEffect(() => {
    if (trades.length) return;
    dispatch(getTrades(user.id));
  }, [trades, CurentPrice]);

  const handleClick = (currency: string) => () => {
    dispatch(setCurrentCurrency(currency));
    const socketcur = Object.keys(currencyEnum).find(
      (item) => currencyEnum[item as keyof typeof currencyEnum] === currency
    );
    dispatch(setSocketCurrency(socketcur || ""));
    socket.send(socketcur || "");
    localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, currency || "");
    localStorage.setItem(SOCKET_CURRENCY_LOCALSTORAGE_KEY, socketcur || "");
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ClosedTrades trades={trades} handleClick={handleClick} />
          <OpenedTrades trades={trades} handleClick={handleClick} />
        </>
      )}
    </>
  );
};
