import React from "react";
import { currencyPoolSelector } from "../../../../Chart/store/selectors";
import { TableCell, TableRow } from "@material-ui/core";
import { Trade } from "../../../store/types";
import { useSelector } from "react-redux";
import moment from "moment";
import { useStyles } from "../styles";
import classNames from "classnames";

interface Props {
  trade: Trade;
  handleClick: (currency: string) => () => void;
}

export const ClosedTradesItem = ({ trade, handleClick }: Props) => {
  const currencyPool = useSelector(currencyPoolSelector);
  const classes = useStyles();
  const currentTradePrice =
    currencyPool[trade.currency.replace("/", "") as keyof typeof currencyPool];
  const isWin = trade.result === "WIN";
  return (
    <TableRow
      className={classNames(classes.item, isWin ? classes.win : classes.lose)}
    >
      <TableCell
        onClick={handleClick(trade.currency)}
        className={classNames(classes.currency, classes.cell)}
      >
        {trade.currency}
      </TableCell>
      <TableCell className={classes.cell}>{trade.trade_price}$</TableCell>
      <TableCell className={classes.cell}>{trade.direction ? "BUY/LONG" : "SELL/SHORT"}</TableCell>
      <TableCell className={classes.cell}>{trade.time}min.</TableCell>
      <TableCell className={classes.cell}>{trade.result}</TableCell>
      <TableCell className={classes.cell}>{trade.price_on_open}</TableCell>
      <TableCell className={classes.cell}>{trade.price_on_close?.toFixed(4)}</TableCell>
      <TableCell className={classes.cell}>
        {moment(trade.end_time).format("MMM Do YYYY, HH:mm:ss")}
      </TableCell>
    </TableRow>
  );
};
