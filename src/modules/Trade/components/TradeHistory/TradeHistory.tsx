import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currencyEnum,
  CURRENCY_LOCALSTORAGE_KEY,
  SOCKET_CURRENCY_LOCALSTORAGE_KEY,
} from "../../../../libs/utils/constants";
import {
  setCurrentCurrency,
  setSocketCurrency,
} from "../../../Chart/store/actions";
import { tradesLoadingSelector, tradesSelector } from "../../store/selectors";
import { ClosedTrades } from "./ClosedTrades/ClosedTrades";
import { OpenedTrades } from "./OpenedTrades/OpenedTrades";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../TabPanel";
import { WebSocketContext } from "../../../../libs/ui/layouts/SocketContext";

export const TradeHistory = () => {
  const dispatch = useDispatch();
  const loading = useSelector(tradesLoadingSelector);
  const trades = useSelector(tradesSelector);
  const [tabValue, setTabValue] = useState(0);
  const { socket } = useContext<any>(WebSocketContext);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClick = (currency: string) => () => {
    dispatch(setCurrentCurrency(currency) as any);
    const socketcur = Object.keys(currencyEnum).find(
      (item) => currencyEnum[item as keyof typeof currencyEnum] === currency
    );
    dispatch(setSocketCurrency(socketcur || "") as any);
    socket.send(socketcur || "");
    localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, currency || "");
    localStorage.setItem(SOCKET_CURRENCY_LOCALSTORAGE_KEY, socketcur || "");
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ flex: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Closed Trades" />
              <Tab label="Opened Trades" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <ClosedTrades trades={trades} handleClick={handleClick} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <OpenedTrades trades={trades} handleClick={handleClick} />
          </TabPanel>
        </Box>
      )}
    </>
  );
};
