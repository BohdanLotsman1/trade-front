import React from "react";
import { Trade } from "../../../store/types";
import moment from "moment";
import { styles } from "../styles";
import { TableCell, TableRow } from "@mui/material";

interface Props {
  trade: Trade;
  handleClick: (currency: string) => () => void;
}

export const ClosedTradesItem = ({ trade, handleClick }: Props) => {
  return (
    <TableRow
      sx={{
        ...styles.item,
        ...(trade.result === "WIN" ? styles.win : styles.lose),
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
      <TableCell sx={styles.cell}>{trade.result}</TableCell>
      <TableCell sx={styles.cell}>{trade.price_on_open}</TableCell>
      <TableCell sx={styles.cell}>
        {Number(trade.price_on_close)?.toFixed(4)}
      </TableCell>
      <TableCell sx={styles.cell}>
        {moment(trade.end_time).format("MMM Do YYYY, HH:mm:ss")}
      </TableCell>
    </TableRow>
  );
};
