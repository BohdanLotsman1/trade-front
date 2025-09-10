import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartHistory, setCurrentCurrency } from "../store/actions";
import {
  chartDataSelector,
  currencySelector,
  loadingSelector,
} from "../store/selectors";
import { CURRENCY_LOCALSTORAGE_KEY } from "../../../libs/utils/constants";
import { calculateSMA } from "../../../libs/utils/helpers";
import { Box, CircularProgress } from "@mui/material";
import { getUserSelector } from "../../User/store/selectors";
import { WebSocketContext } from "../../../libs/ui/layouts/SocketContext";
import { useChart } from "../hooks/useChart";
import { getVolume } from "../utils";
import { useChartSocketMessages } from "../hooks/useChartSocketMessages";

export const Chart = () => {
  const dispatch = useDispatch();
  const currencyPair = useSelector(currencySelector);
  const loading = useSelector(loadingSelector);
  const user = useSelector(getUserSelector);
  const chartData = useSelector(chartDataSelector);
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
    dispatch(getChartHistory({ currency }) as any);
  }, [currencyPair, dispatch, user.id]);

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
    chart?.applyOptions({
      width: (ref.current?.clientWidth || 40) - 40,
      height: ref.current?.clientHeight,
    });
  }, [chart]);

  useEffect(() => {
    window.addEventListener("resize", setChartDimensions);
    return () => window.removeEventListener("resize", setChartDimensions);
  }, [setChartDimensions]);

  return (
    <Box sx={{ flex: 1, height: 300 }} ref={ref}>
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            zIndex: 10,
          }}
        />
      )}
      <div
        id="chart"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};
