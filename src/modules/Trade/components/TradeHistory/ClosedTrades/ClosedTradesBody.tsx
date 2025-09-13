import React from "react";
import { Trade } from "../../../store/types";
import { styles } from "../styles";
import { ClosedTradesItem } from "./ClosedTradesItem";
import { TableBody } from "@mui/material";

interface Props {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const ClosedTradesBody = ({ trades, handleClick }: Props) => {
  return (
    <TableBody sx={styles.body}>
      {trades.map((trade: Trade) => (
        <ClosedTradesItem
          handleClick={handleClick}
          trade={trade}
          key={trade.id}
        />
      ))}
    </TableBody>
  );
};
