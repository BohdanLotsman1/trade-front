import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  IChartApi,
  ISeriesApi,
  LineSeries,
} from "lightweight-charts";
import { useEffect, useState } from "react";

type UseChartResult = {
  candlestickChart: ISeriesApi<"Candlestick"> | null;
  volumeChart: ISeriesApi<"Histogram"> | null;
  chart: IChartApi | null;
  smaLines: ISeriesApi<"Line">[];
};

export const useChart = (): UseChartResult => {
  const chartElement = document.getElementById("chart");
  const [candlestickChart, setCandlestickChart] =
    useState<ISeriesApi<"Candlestick"> | null>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [volumeChart, setVolumeChart] =
    useState<ISeriesApi<"Histogram"> | null>(null);
  const [smaLines, setSmaLines] = useState<ISeriesApi<"Line">[]>([]);

  useEffect(() => {
    if (chartElement) chartElement.innerHTML = "";

    if (!chartElement) return;

    const chart = createChart(chartElement, {
      timeScale: {
        fixLeftEdge: true,
        timeVisible: true,
        secondsVisible: true,
        rightOffset: 5,
        barSpacing: 10,
        minBarSpacing: 3,
        maxBarSpacing: 30,
        borderColor: "#182233",
      },
      layout: {
        background: { color: "#3c3c3c" },
        textColor: "#bebebeff",
      },
      grid: {
        vertLines: {
          color: "#5d5d5d",
          style: 0,
          visible: true,
        },
        horzLines: {
          color: "#5d5d5d",
          style: 0,
          visible: true,
        },
      },
    });
    setChart(chart);
    const chartSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      wickColor: "#838ca1",
      priceFormat: {
        type: "custom",
        formatter: (price: number) => price.toFixed(5),
        minMove: 0.00001,
      },
    });
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume", precision: 4 },
      color: "#182233",
      priceScaleId: "volume",
      priceLineVisible: false,
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.75, bottom: 0 },
    });
    setCandlestickChart(chartSeries);
    setVolumeChart(volumeSeries);
    const smaLine = chart.addSeries(LineSeries, {
      priceLineVisible: false,
      color: "blue",
      lineWidth: 1,
    });

    const smaLine1 = chart.addSeries(LineSeries, {
      priceLineVisible: false,
      color: "red",
      lineWidth: 1,
    });

    const smaLine2 = chart.addSeries(LineSeries, {
      priceLineVisible: false,
      color: "green",
      lineWidth: 1,
    });
    setSmaLines([smaLine, smaLine1, smaLine2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartElement]);

  return {
    candlestickChart,
    volumeChart,
    chart,
    smaLines,
  };
};
