import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { closeTrade } from "../../../store/actions";
import { Trade } from "../../../store/types";
import { TableBody } from "@material-ui/core";
import { TradeItem } from "./TradeItem";
import { useStyles } from "../styles";

interface Props {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const TradesTableBody = ({ trades, handleClick }: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClose = (id: string) => () => {
    dispatch(closeTrade(id));
  };

  return (
    <TableBody className={classes.body}>
      {trades
        .sort(
          (a, b) =>
            Date.parse(b.created_at || "") - Date.parse(a.created_at || "")
        )
        .filter((item) => item.state === "OPENED")
        .map((trade: Trade) => (
          <TradeItem
            handleClick={handleClick}
            handleClose={handleClose}
            trade={trade}
          />
        ))}
    </TableBody>
  );
};
