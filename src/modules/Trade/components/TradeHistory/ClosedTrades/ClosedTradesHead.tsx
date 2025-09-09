import React from "react";
import { styles } from "../styles";
import { TableCell, TableHead, TableRow } from "@mui/material";

export const ClosedTradesHead = () => {
  return (
    <TableHead sx={styles.header}>
      <TableRow>
        <TableCell sx={styles.headCell}>Currency</TableCell>
        <TableCell sx={styles.headCell}>Bet</TableCell>
        <TableCell sx={styles.headCell}>Bet direction</TableCell>
        <TableCell sx={styles.headCell}>Time</TableCell>
        <TableCell sx={styles.headCell}>Result</TableCell>
        <TableCell sx={styles.headCell}>Price on open</TableCell>
        <TableCell sx={styles.headCell}>Price on close</TableCell>
        <TableCell sx={styles.headCell}>Closed at</TableCell>
      </TableRow>
    </TableHead>
  );
};
