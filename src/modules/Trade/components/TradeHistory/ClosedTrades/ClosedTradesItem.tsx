import React from "react";
// import { currencyPoolSelector } from "../../../../Chart/store/selectors";
import { Trade } from "../../../store/types";
// import { useSelector } from "react-redux";
import moment from "moment";
import { styles } from "../styles";
import { TableCell, TableRow } from "@mui/material";

interface Props {
  trade: Trade;
  handleClick: (currency: string) => () => void;
}

export const ClosedTradesItem = ({ trade, handleClick }: Props) => {
  // const currencyPool = useSelector(currencyPoolSelector);

  // const currentTradePrice =
  //   currencyPool[trade.currency.replace("/", "") as keyof typeof currencyPool];

  const isWin = trade.result === "WIN";

  return (
    <TableRow
      sx={{
        ...styles.item,
        ...(isWin ? styles.win : styles.lose),
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
      <TableCell sx={styles.cell}>{trade.result}</TableCell>
      <TableCell sx={styles.cell}>{trade.price_on_open}</TableCell>
      <TableCell sx={styles.cell}>{trade.price_on_close?.toFixed(4)}</TableCell>
      <TableCell sx={styles.cell}>
        {moment(trade.end_time).format("MMM Do YYYY, HH:mm:ss")}
      </TableCell>
    </TableRow>
  );
};
