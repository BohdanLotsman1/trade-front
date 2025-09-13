import React from "react";
import { useDispatch } from "react-redux";
import { closeTrade } from "../../../store/actions";
import { Trade } from "../../../store/types";
import { TradeItem } from "./TradeItem";
import { TableBody } from "@mui/material";
import { styles } from "../styles";

interface Props {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const TradesTableBody = ({ trades, handleClick }: Props) => {
  const dispatch = useDispatch();

  const handleClose = (id: string) => () => {
    dispatch(closeTrade(id) as any);
  };

  return (
    <TableBody sx={styles.body}>
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
            key={trade.id}
          />
        ))}
    </TableBody>
  );
};
