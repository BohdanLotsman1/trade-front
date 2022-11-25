import { Table } from "@material-ui/core";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyPoolSelector } from "../../../../Chart/store/selectors";
import { getWallet } from "../../../../User/store/actions";
import { getTrades } from "../../../store/actions";
import { Trade } from "../../../store/types";
import { useStyles } from "../styles";
import { TradesTableBody } from "./TradesTableBody";
import { TradesTableHeader } from "./TradesTableHead";

interface OpenedTradesProps {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const OpenedTrades = ({ trades, handleClick }: OpenedTradesProps) => {
  const currencyPool = useSelector(currencyPoolSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    trades
      .filter((item) => item.state === "OPENED")
      .map((trade: Trade) => {
        if (moment(trade.end_time).format() === moment().format()) {
          dispatch(getTrades(trade.user_id));
          dispatch(getWallet(trade.user_id));
        }
      });
  }, [currencyPool]);

  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className={classes.opened}>
      <div className={classes.title}>OPENED</div>
      <div className={classes.scrollContainer}>
        <Table className={classes.table}>
          <TradesTableHeader />
          <TradesTableBody trades={trades} handleClick={handleClick} />
        </Table>
      </div>
    </div>
  );
};
