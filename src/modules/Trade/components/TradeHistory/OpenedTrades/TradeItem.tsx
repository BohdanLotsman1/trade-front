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
  handleClose: (id: string) => () => void;
  handleClick: (currency: string) => () => void;
}

export const TradeItem = ({ trade, handleClose, handleClick }: Props) => {
  const currencyPool = useSelector(currencyPoolSelector);
  const classes = useStyles();
  const currentTradePrice =
    currencyPool[trade.currency.replace("/", "") as keyof typeof currencyPool];
  const longWinConditions = trade.price_on_open < currentTradePrice;
  return (
    <TableRow
      className={classNames(
        classes.item,
        trade.direction
          ? longWinConditions
            ? classes.win
            : classes.lose
          : !longWinConditions
          ? classes.win
          : classes.lose
      )}
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
      <TableCell className={classes.cell}>{trade.price_on_open}$</TableCell>
      <TableCell className={classes.cell}>
        {moment.utc(moment(trade.end_time).diff(moment())).format("HH:mm:ss")}
      </TableCell>
      <TableCell className={classes.cell}>
        <button
          className={classes.closeBtn}
          onClick={handleClose(trade.id || "")}
        >
          Close
        </button>
      </TableCell>
    </TableRow>
  );
};
