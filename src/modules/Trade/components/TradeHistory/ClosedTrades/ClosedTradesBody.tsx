import React from "react";
import { Trade } from "../../../store/types";
import { TableBody } from "@material-ui/core";
import { useStyles } from "../styles";
import { ClosedTradesItem } from "./ClosedTradesItem";

interface Props {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const ClosedTradesBody = ({ trades, handleClick }: Props) => {
  const classes = useStyles();

  return (
    <TableBody className={classes.body}>
      {trades
        .filter((item) => item.state === "CLOSED")
        .map((trade: Trade) => (
          <ClosedTradesItem
            handleClick={handleClick}
            trade={trade}
          />
        ))}
    </TableBody>
  );
};