import React from "react";
import { Chart } from "../../modules/Chart/components/Chart";
import { TradeForm } from "../../modules/Trade/components/TradeForm";
import { TradeHistory } from "../../modules/Trade/components/TradeHistory/TradeHistory";
import "./style.scss";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../modules/User/store/selectors";
import { Box } from "@mui/material";

const Home = () => {
  const user = useSelector(getUserSelector);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 2,
          paddingBottom: 2,
          paddingTop: 2,
          paddingX: 1,
        }}
      >
        <Chart />
        <Box
          className={"tradeHistory"}
          style={{ display: user?.id ? "flex" : "none", width: "100%" }}
        >
          <TradeHistory />
          <TradeForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
