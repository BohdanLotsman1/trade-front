import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartHistory, setCurrentCurrency } from "../store/actions";
import {
  chartDataSelector,
  currencySelector,
  loadingSelector,
  timeIntervalSelector,
} from "../store/selectors";
import { CURRENCY_LOCALSTORAGE_KEY } from "../../../libs/utils/constants";
import { calculateSMA } from "../../../libs/utils/helpers";
import { Box, CircularProgress } from "@mui/material";
import { getUserSelector } from "../../User/store/selectors";
import { WebSocketContext } from "../../../libs/ui/layouts/SocketContext";
import { useChart } from "../hooks/useChart";
import { getVolume } from "../utils";
import { useChartSocketMessages } from "../hooks/useChartSocketMessages";
import { TimelineButtons } from "./TimelineButtons";

export const Chart = () => {
  const dispatch = useDispatch();
  const currencyPair = useSelector(currencySelector);
  const loading = useSelector(loadingSelector);
  const user = useSelector(getUserSelector);
  const chartData = useSelector(chartDataSelector);
  const interval = useSelector(timeIntervalSelector);

  const ref = useRef<HTMLDivElement | null>(null);
  const { socket } = useContext<any>(WebSocketContext);
  const { candlestickChart, volumeChart, smaLines, chart } = useChart();

  useChartSocketMessages({ candlestickChart, volumeChart, smaLines });

  useEffect(() => {
    const currency =
      localStorage.getItem(CURRENCY_LOCALSTORAGE_KEY) ?? "BTC/USDT";
    if (!currencyPair) {
      dispatch(setCurrentCurrency(currency) as any);
      return;
    }
    dispatch(getChartHistory({ currency, interval }) as any);
  }, [currencyPair, dispatch, user.id, interval]);

  useEffect(() => {
    let volumeData = getVolume(chartData);

    if (candlestickChart && volumeChart && chart && socket) {
      candlestickChart.setData(chartData);
      volumeChart.setData(volumeData);

      smaLines[0].setData(calculateSMA(chartData, 7));
      smaLines[1].setData(calculateSMA(chartData, 25));
      smaLines[2].setData(calculateSMA(chartData, 99));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candlestickChart, chart, chartData, volumeChart, currencyPair, socket]);

  const setChartDimensions = React.useCallback(() => {
    setTimeout(() => {
      chart?.applyOptions({
        width: ref.current?.clientWidth,
        height: ref.current?.clientHeight,
      });
    }, 100);
  }, [chart]);

  useEffect(() => {
    setChartDimensions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  useEffect(() => {
    window.addEventListener("resize", setChartDimensions);
    return () => window.removeEventListener("resize", setChartDimensions);
  }, [setChartDimensions]);

  return (
    <Box
      sx={{
        gridColumnStart: 1,
        gridColumnEnd: user.id ? 4 : 5,
        gridRowStart: 1,
        gridRowEnd: 5,
        position: "relative",
      }}
      ref={ref}
    >
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-20px",
            marginLeft: "-20px",
            zIndex: 10,
          }}
        />
      )}

      <TimelineButtons />

      <Box
        id="chart"
        sx={{
          height: "100%",
          maxHeight: ref.current?.clientHeight,
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0px 0px 2px 2px #00000029",
        }}
      />
    </Box>
  );
};
