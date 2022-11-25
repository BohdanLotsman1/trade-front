import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { cryptoCurrency } from "../../../libs/utils/helpers";
import {
  getChartHistory,
  setCandleObject,
  setCurrencyPoolItem,
  setCurrentCurrency,
  setSocketCurrency,
} from "../store/actions";
import {
  chartDataSelector,
  currencySelector,
  loadingSelector,
  socketCurrencySelector,
} from "../store/selectors";
import { makeStyles } from "@material-ui/core/styles";
import {
  CurentPrice,
  currencyEnum,
  CURRENCY_LOCALSTORAGE_KEY,
  socket,
  socketCurrEnum,
  SOCKET_CURRENCY_LOCALSTORAGE_KEY,
} from "../../../libs/utils/constants";
import { CircularProgress } from "@material-ui/core";
import { createCandlestickChart, getVolume } from "../../../libs/utils/helpers";

interface StyleProps {
  loading: boolean;
}
const useStyles = makeStyles({
  chartContainer: {
    width: "calc(100% - 300px)",
    height: "100%",
    padding: "20px 0 20px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  chart: (loading: StyleProps) => ({
    display: loading ? "none" : "flex",
  }),
});

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const Chart = () => {
  const dispatch = useDispatch();
  const currencyPair = useSelector(currencySelector);
  const socketPair = useSelector(socketCurrencySelector);
  const loading = useSelector(loadingSelector);
  const chartData = useSelector(chartDataSelector);
  const classes = useStyles({ loading });
  const ref = useRef<HTMLDivElement | null>(null);
  const currency =
    localStorage.getItem(CURRENCY_LOCALSTORAGE_KEY) ?? currencyEnum.adabusd;
  const socketCurrency =
    localStorage.getItem(SOCKET_CURRENCY_LOCALSTORAGE_KEY) ??
    socketCurrEnum.adabusd;
  const [chartWidth, setChartWidth] = useState<number>(
    ref.current?.clientWidth ?? 450
  );
  const [chartHeight, setChartHeight] = useState<number>(
    ref.current?.clientHeight ?? 250
  );
  const setChartDimensions = () => {
    console.log(ref.current?.clientWidth, ref.current?.clientHeight);

    setChartWidth(ref.current?.clientWidth ?? 0);
    setChartHeight(ref.current?.clientHeight ?? 0);
  };

  useEffect(() => {
    if (!currencyPair && !socketPair) {
      dispatch(setCurrentCurrency(currency));
      dispatch(setSocketCurrency(socketCurrency));
      return;
    }
    dispatch(getChartHistory(currencyPair));
  }, [currencyPair, socketPair]);

  useEffect(() => {
    setChartDimensions();
  }, [ref.current]);

  useEffect(() => {
    chartData.length &&
      socketPair &&
      createCandlestickChart(
        currencyPair,
        socketPair,
        chartData,
        dispatch,
        chartWidth - 30,
        chartHeight - 40
      );
  }, [currencyPair, chartData, socketPair, chartWidth, chartHeight]);

  useEffect(() => {
    window.addEventListener("resize", setChartDimensions);
    return () => window.removeEventListener("resize", setChartDimensions);
  }, []);

  return (
    <div className={classes.chartContainer} ref={ref}>
      {loading && <CircularProgress />}
      <div id="chart" style={{ display: loading ? "none" : "flex" }} />
    </div>
  );
};
