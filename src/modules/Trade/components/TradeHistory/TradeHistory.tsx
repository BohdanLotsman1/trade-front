import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCY_LOCALSTORAGE_KEY } from "../../../../libs/utils/constants";
import { setCurrentCurrency } from "../../../Chart/store/actions";
import { ClosedTrades } from "./ClosedTrades/ClosedTrades";
import { OpenedTrades } from "./OpenedTrades/OpenedTrades";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../TabPanel";
import { getUserSelector } from "../../../User/store/selectors";
import { getTrades } from "../../store/actions";

export const TradeHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClick = (currency: string) => () => {
    dispatch(setCurrentCurrency(currency) as any);
    localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, currency || "");
  };

  useEffect(() => {
    if (user.id) {
      dispatch(getTrades(user.id) as any);
    }
  }, [dispatch, user.id, tabValue]);

  return (
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
        <OpenedTrades handleClick={handleClick} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ClosedTrades handleClick={handleClick} />
      </TabPanel>
    </Box>
  );
};
