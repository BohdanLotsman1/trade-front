import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cryptoCurrency } from "../../../libs/utils/helpers";

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
import "./style.scss";

export const StockChart = () => {
  const dispatch = useDispatch();

  const currencyPair = useSelector(currencySelector);
  const socketPair = useSelector(socketCurrencySelector);
  const loading = useSelector(loadingSelector);
  const chartData = useSelector(chartDataSelector);


  useEffect(() => {
    if (!currencyPair && !socketPair) {
      dispatch(setCurrentCurrency("ADA/BUSD"));
      dispatch(setSocketCurrency("adabusd"));
      return;
    }
    dispatch(getChartHistory(currencyPair));
  }, [currencyPair, socketPair]);

  useEffect(() => {
    chartData.length && socketPair && cryptoCurrency(currencyPair, socketPair, chartData, dispatch);
  }, [currencyPair, chartData, socketPair]);

  return (
    <div className="chart">
      {loading ? "loading..." : ""}
      <div
        id="chart"
        style={{ display: loading ? "none" : "flex" }}
      />
    </div>
  );
};
