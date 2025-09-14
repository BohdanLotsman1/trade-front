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
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
        // gridTemplateColumns: "repeat(4, 1fr)",
        // gridTemplateRows: "minmax(100px, 170px) auto",
        // gridTemplateRows: "170px",
        gridColumnGap: 8,
        gridRowGap: 8,
        padding: 1,
      }}
    >
      <Chart />
      {user?.id && (
        <>
          <TradeForm />
          <TradeHistory />
        </>
      )}
    </Box>
  );
};

export default Home;
