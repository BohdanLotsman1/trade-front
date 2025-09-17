import React, { useEffect } from "react";
import { Trade } from "../../../store/types";
import moment from "moment";
import { styles } from "../styles";
import { Button, TableCell, TableRow } from "@mui/material";
import { currencyPoolSelector } from "../../../../Chart/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { closeTrade } from "../../../store/actions";
import { getWallet } from "../../../../User/store/actions";

interface Props {
  trade: Trade;
  handleClose: (id: string) => () => void;
  handleClick: (currency: string) => () => void;
}

export const TradeItem = ({ trade, handleClose, handleClick }: Props) => {
  const currencyPool = useSelector(currencyPoolSelector);
  const tradeCurrency = trade.currency.replace("/", "");
  const dispatch = useDispatch();
  const [time, setTime] = React.useState(
    moment.utc(moment(trade.end_time).diff(moment())).format("HH:mm:ss")
  );
  const currentTradePrice =
    currencyPool.find(
      (item: { currency: string; value: number }) =>
        item.currency === tradeCurrency
    )?.value || 0;

  const winConditions = Number(trade.direction)
    ? currentTradePrice > trade.price_on_open
    : trade.price_on_open > currentTradePrice;

  useEffect(() => {
    const interval = setInterval(() => {
      if (moment(trade.end_time).format() <= moment().format()) {
        dispatch(closeTrade(trade.id) as any);

        dispatch(getWallet(trade.user_id) as any);
      }
      setTime(
        moment.utc(moment(trade.end_time).diff(moment())).format("HH:mm:ss")
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableRow
      sx={{
        ...styles.item,
        ...(winConditions ? styles.win : styles.lose),
      }}
    >
      <TableCell
        onClick={handleClick(trade.currency)}
        sx={{ ...styles.currency, ...styles.cell }}
      >
        {trade.currency}
      </TableCell>
      <TableCell sx={styles.cell}>{trade.trade_price}$</TableCell>
      <TableCell sx={styles.cell}>
        {+trade.direction ? "BUY/LONG" : "SELL/SHORT"}
      </TableCell>
      <TableCell sx={styles.cell}>{trade.time}min.</TableCell>
      <TableCell sx={styles.cell}>{trade.price_on_open}$</TableCell>
      <TableCell sx={styles.cell}>{time}</TableCell>
      <TableCell sx={styles.cell}>
        <Button sx={styles.closeBtn} onClick={handleClose(trade.id || "")}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};
