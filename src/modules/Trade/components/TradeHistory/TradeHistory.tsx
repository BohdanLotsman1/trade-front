import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCY_LOCALSTORAGE_KEY } from "../../../../libs/utils/constants";
import { setCurrentCurrency } from "../../../Chart/store/actions";
import { tradesLoadingSelector, tradesSelector } from "../../store/selectors";
import { ClosedTrades } from "./ClosedTrades/ClosedTrades";
import { OpenedTrades } from "./OpenedTrades/OpenedTrades";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../TabPanel";

export const TradeHistory = () => {
  const dispatch = useDispatch();
  const loading = useSelector(tradesLoadingSelector);
  const trades = useSelector(tradesSelector);
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClick = (currency: string) => () => {
    dispatch(setCurrentCurrency(currency) as any);
    localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, currency || "");
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            borderRadius: 1,
            boxShadow: "0px 0px 2px 2px #00000029",
            gridColumnStart: 1,
            gridColumnEnd: 5,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "& .Mui-selected": {
                  color: "white !important",
                },
                "& .MuiTabs-indicator": { backgroundColor: "white" },
                "& .MuiTab-root": { color: "#9b9b9bff" },
              }}
            >
              <Tab label="Opened Trades" />
              <Tab label="Closed Trades" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <OpenedTrades trades={trades} handleClick={handleClick} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ClosedTrades trades={trades} handleClick={handleClick} />
          </TabPanel>
        </Box>
      )}
    </>
  );
};
