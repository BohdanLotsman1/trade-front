import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWallet } from "../../../../User/store/actions";
import { getTrades } from "../../../store/actions";
import { Trade } from "../../../store/types";
import { styles } from "../styles";
import { TradesTableBody } from "./TradesTableBody";
import { TradesTableHeader } from "./TradesTableHead";
import { Box, Table } from "@mui/material";

interface OpenedTradesProps {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const OpenedTrades = ({ trades, handleClick }: OpenedTradesProps) => {
  // const currencyPool = useSelector(currencyPoolSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    trades
      .filter((item) => item.state === "OPENED")
      .forEach((trade: Trade) => {
        if (moment(trade.end_time).format() === moment().format()) {
          dispatch(getTrades(trade.user_id) as any);
          dispatch(getWallet(trade.user_id) as any);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <Box sx={styles.scrollContainer}>
      <Table sx={styles.table}>
        <TradesTableHeader />
        <TradesTableBody trades={trades} handleClick={handleClick} />
      </Table>
    </Box>
  );
};
