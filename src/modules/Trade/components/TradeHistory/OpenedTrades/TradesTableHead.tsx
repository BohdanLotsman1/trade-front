import React from "react";
import { styles } from "../styles";
import { TableCell, TableHead, TableRow } from "@mui/material";

export const TradesTableHeader = () => {
  return (
    <TableHead sx={styles.header}>
      <TableRow>
        <TableCell sx={styles.headCell}>Currency</TableCell>
        <TableCell sx={styles.headCell}>Bet</TableCell>
        <TableCell sx={styles.headCell}>Bet direction</TableCell>
        <TableCell sx={styles.headCell}>Time</TableCell>
        <TableCell sx={styles.headCell}>Price</TableCell>
        <TableCell sx={styles.headCell}>Time left</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};
