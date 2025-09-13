import React from "react";
import { Box, Table } from "@mui/material";
import { Trade } from "../../../store/types";
import { styles } from "../styles";
import { ClosedTradesBody } from "./ClosedTradesBody";
import { ClosedTradesHead } from "./ClosedTradesHead";
import { EmptyList } from "../../EmptyList";

interface ClosedTradesProps {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const ClosedTrades = ({ trades, handleClick }: ClosedTradesProps) => {
  const closedTrades = trades
    .filter((item) => item.state === "CLOSED")
    .sort(
      (a, b) => Date.parse(b.created_at || "") - Date.parse(a.created_at || "")
    );

  return (
    <Box sx={styles.scrollContainer}>
      {closedTrades.length === 0 ? (
        <EmptyList title="No closed trades" />
      ) : (
        <Table sx={styles.table}>
          <ClosedTradesHead />
          <ClosedTradesBody handleClick={handleClick} trades={closedTrades} />
        </Table>
      )}
    </Box>
  );
};
