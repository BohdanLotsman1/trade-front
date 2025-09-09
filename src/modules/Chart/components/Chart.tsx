import React, { useContext, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChartHistory,
  setCurrentCurrency,
  setSocketCurrency,
} from "../store/actions";
import {
  chartDataSelector,
  currencySelector,
  loadingSelector,
  socketCurrencySelector,
} from "../store/selectors";
import {
  currencyEnum,
  CURRENCY_LOCALSTORAGE_KEY,
  socketCurrEnum,
  SOCKET_CURRENCY_LOCALSTORAGE_KEY,
} from "../../../libs/utils/constants";
import { createCandlestickChart } from "../../../libs/utils/helpers";
import { Box, CircularProgress } from "@mui/material";
import "./style.scss";
import { getUserSelector } from "../../User/store/selectors";
import { WebSocketContext } from "../../../libs/ui/layouts/SocketContext";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Highstock from "highcharts/highstock";
import { getOptions } from "../constants";
// const exporting = require("highcharts/modules/exporting");
// const Exporting = require("highcharts/modules/exporting");
// Exporting(Highcharts);

export const Chart = () => {
  const dispatch = useDispatch();
  const currencyPair = useSelector(currencySelector);
  const socketPair = useSelector(socketCurrencySelector);
  const loading = useSelector(loadingSelector);
  const user = useSelector(getUserSelector);
  const chartData = useSelector(chartDataSelector);
  const ref = useRef<HTMLDivElement | null>(null);
  const { socket } = useContext<any>(WebSocketContext);

  const volume = useMemo(
    () =>
      chartData?.length &&
      chartData.map((item) => ({ time: item.time, value: item.volume })),
    [chartData]
  );

  const currency =
    localStorage.getItem(CURRENCY_LOCALSTORAGE_KEY) ?? currencyEnum.adabusd;
  const socketCurrency =
    localStorage.getItem(SOCKET_CURRENCY_LOCALSTORAGE_KEY) ??
    socketCurrEnum.adabusd;

  // const [chartWidth, setChartWidth] = useState<number>(
  //   ref.current?.clientWidth ?? 450
  // );
  // const [chartHeight, setChartHeight] = useState<number>(
  //   ref.current?.clientHeight ?? 250
  // );
  // const setChartDimensions = () => {
  //   console.log(ref.current?.clientWidth, ref.current?.clientHeight);

  //   setChartWidth(ref.current?.clientWidth ?? 0);
  //   setChartHeight(ref.current?.clientHeight ?? 0);
  // };

  useEffect(() => {
    if (!currencyPair && !socketPair) {
      dispatch(setCurrentCurrency(currency) as any);
      dispatch(setSocketCurrency(socketCurrency) as any);
      return;
    }
    dispatch(getChartHistory({ currency: socketPair }) as any);
  }, [currency, currencyPair, dispatch, socketCurrency, socketPair, user.id]);

  // useEffect(() => {
  //   setChartDimensions();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ref.current]);

  // useEffect(() => {
  //   chartData.length &&
  //     socketPair &&
  //     createCandlestickChart(
  //       currencyPair,
  //       socketPair,
  //       chartData,
  //       dispatch,
  //       socket
  //     );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currencyPair, chartData, socketPair]);

  // useEffect(() => {
  //   window.addEventListener("resize", setChartDimensions);
  //   return () => window.removeEventListener("resize", setChartDimensions);
  // }, []);
  console.log(loading, chartData);

  return (
    <Box className={"chartContainer"}>
      {loading && <CircularProgress />}
      {/* <div
        id="chart"
        style={{
          display: loading ? "none" : "flex",
          width: "100%",
          height: "100%",
        }}
      /> */}
      <HighchartsReact
        width={"100%"}
        height={"100%"}
        highcharts={Highstock}
        constructorType="stockChart"
        options={{
          ...getOptions(chartData, volume),
          title: { text: currencyPair?.toUpperCase(), loading: loading },
        }}
        containerProps={{ style: { width: "100%" } }}
      />
    </Box>
  );
};
