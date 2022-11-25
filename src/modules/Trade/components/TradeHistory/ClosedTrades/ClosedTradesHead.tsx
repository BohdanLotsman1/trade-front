import React from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { useStyles } from "../styles";

export const ClosedTradesHead = () => {
  const classes = useStyles();
  return (
    <TableHead className={classes.header}>
      <TableRow>
        <TableCell className={classes.headCell}>Currency</TableCell>
        <TableCell className={classes.headCell}>Bet</TableCell>
        <TableCell className={classes.headCell}>Bet direction</TableCell>
        <TableCell className={classes.headCell}>Time</TableCell>
        <TableCell className={classes.headCell}>Result</TableCell>
        <TableCell className={classes.headCell}>Price on open</TableCell>
        <TableCell className={classes.headCell}>Price on close</TableCell>
        <TableCell className={classes.headCell}>Closed at</TableCell>
      </TableRow>
    </TableHead>
  );
};
