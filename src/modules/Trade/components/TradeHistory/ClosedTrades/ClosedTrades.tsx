import React from "react";
import { Box, Table } from "@mui/material";
import { Trade } from "../../../store/types";
import { styles } from "../styles";
import { ClosedTradesBody } from "./ClosedTradesBody";
import { ClosedTradesHead } from "./ClosedTradesHead";

interface ClosedTradesProps {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const ClosedTrades = ({ trades, handleClick }: ClosedTradesProps) => {
  return (
    <Box sx={styles.scrollContainer}>
      <Table sx={styles.table}>
        <ClosedTradesHead />
        <ClosedTradesBody handleClick={handleClick} trades={trades} />
      </Table>
    </Box>
  );
};
