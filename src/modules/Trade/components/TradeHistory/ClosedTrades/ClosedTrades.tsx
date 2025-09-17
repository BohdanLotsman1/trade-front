import React from "react";
import { Box, CircularProgress, Table } from "@mui/material";
import { styles } from "../styles";
import { ClosedTradesBody } from "./ClosedTradesBody";
import { ClosedTradesHead } from "./ClosedTradesHead";
import { EmptyList } from "../../EmptyList";
import { useSelector } from "react-redux";
import {
  tradesLoadingSelector,
  tradesSelector,
} from "../../../store/selectors";

interface ClosedTradesProps {
  handleClick: (currency: string) => () => void;
}

export const ClosedTrades = ({ handleClick }: ClosedTradesProps) => {
  const trades = useSelector(tradesSelector);
  const loading = useSelector(tradesLoadingSelector);

  const closedTrades = trades
    .filter((item) => item.state === "CLOSED")
    .sort(
      (a, b) => Date.parse(b.created_at || "") - Date.parse(a.created_at || "")
    );

  return (
    <Box sx={styles.scrollContainer}>
      {loading && <CircularProgress />}
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
