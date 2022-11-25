import { Table } from "@material-ui/core";
import { Trade } from "../../../store/types";
import { useStyles } from "../styles";
import { ClosedTradesBody } from "./ClosedTradesBody";
import { ClosedTradesHead } from "./ClosedTradesHead";

interface ClosedTradesProps {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const ClosedTrades = ({ trades, handleClick }: ClosedTradesProps) => {
  const classes = useStyles();
  return (
    <div className={classes.closed}>
      <div className={classes.title}>CLOSED</div>
      <div className={classes.scrollContainer}>
        <Table className={classes.table}>
          <ClosedTradesHead />
          <ClosedTradesBody handleClick={handleClick} trades={trades}/>
        </Table>
      </div>
    </div>
  );
};
