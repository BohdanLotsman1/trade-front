import React from "react";
import { currencyPoolSelector } from "../../../../Chart/store/selectors";
import { Trade } from "../../../store/types";
import { useSelector } from "react-redux";
import moment from "moment";
import { styles } from "../styles";
import { Button, TableCell, TableRow } from "@mui/material";

interface Props {
  trade: Trade;
  handleClose: (id: string) => () => void;
  handleClick: (currency: string) => () => void;
}

export const TradeItem = ({ trade, handleClose, handleClick }: Props) => {
  const currencyPool = useSelector(currencyPoolSelector);
  const currentTradePrice =
    currencyPool[trade.currency.replace("/", "") as keyof typeof currencyPool];
  const longWinConditions = trade.price_on_open < currentTradePrice;
  return (
    <TableRow
      sx={{
        ...styles.item,
        ...(trade.direction
          ? longWinConditions
            ? styles.win
            : styles.lose
          : !longWinConditions
          ? styles.win
          : styles.lose),
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
        {trade.direction ? "BUY/LONG" : "SELL/SHORT"}
      </TableCell>
      <TableCell sx={styles.cell}>{trade.time}min.</TableCell>
      <TableCell sx={styles.cell}>{trade.price_on_open}$</TableCell>
      <TableCell sx={styles.cell}>
        {moment.utc(moment(trade.end_time).diff(moment())).format("HH:mm:ss")}
      </TableCell>
      <TableCell sx={styles.cell}>
        <Button sx={styles.closeBtn} onClick={handleClose(trade.id || "")}>
          Close
        </Button>
      </TableCell>
    </TableRow>
  );
};
