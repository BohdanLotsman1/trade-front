import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  LineSeries,
  Time,
} from "lightweight-charts";
import {
  setCandleObject,
  setCurrencyPoolItem,
} from "../../modules/Chart/store/actions";
import { Candle } from "../../modules/Chart/store/types";
import { CurentPrice } from "./constants";
import isJson from "../store/services/isJson";

export function sameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function parseJWT(jwt: string): [object, { exp: number }, string] {
  const jwtParts = jwt.split(".") as [string, string, string];
  const header = JSON.parse(atob(jwtParts[0]));
  const payload = JSON.parse(atob(jwtParts[1]));
  const signature = jwtParts[2];

  return [header, payload, signature];
}

export function setToHappen(fn: Function, timestamp: number): number {
  const t = new Date(timestamp).getTime() - new Date().getTime();
  console.log(t);

  return setTimeout(fn, t);
}

const calculateAvg = (candles: Array<Candle>) => {
  let sum = 0;
  candles.map((item: Candle) => {
    sum += item.close;
  });
  return sum / candles.length;
};

export const calculateSMA = (data: Array<Candle>, count: number) => {
  const result = [];
  for (let i = count - 1, len = data.length; i < len; i++) {
    const val = calculateAvg(data.slice(i - count + 1, i));
    result.push({ time: data[i].time, value: val });
  }
  return result;
};

export const createCandlestickChart = (
  currency: string,
  soket_cur: string,
  chartData: Array<Candle>,
  dispatch: any,
  socket: WebSocket
) => {
  const chartElement = document.getElementById("chart");
  const data: Array<Candle> = parsedChart(chartData);
  console.log(data);

  let volumeData = getVolume(data);
  if (chartElement) chartElement.innerHTML = "";
  if (!chartElement) return;
  const chart = createChart(chartElement, {
    timeScale: {
      fixLeftEdge: true,
      timeVisible: true,
      secondsVisible: true,
    },
    width: chartElement.clientWidth,
    height: chartElement.clientHeight,
  });
  // console.log(chart, height, width);
  const chartSeries = chart.addSeries(CandlestickSeries, {
    upColor: "#26a69a",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
    priceFormat: {
      type: "custom",
      formatter: (price: number) => price.toFixed(5),
      minMove: 0.00001,
    },
  });
  chartSeries.priceScale().applyOptions({
    minimumWidth: 70, // occupy 75% of the height
  });
  const volumeSeries = chart.addSeries(HistogramSeries, {
    priceFormat: { type: "volume", precision: 4 },
    color: "#182233",
    priceScaleId: "volume",
    priceLineVisible: false,
  });
  chartSeries.setData(data);
  volumeSeries.setData(volumeData);
  volumeSeries.priceScale().applyOptions({
    scaleMargins: { top: 0.75, bottom: 0 }, // occupy only the bottom slice
  });
  let smaData = calculateSMA(data, 7);
  let smaData1 = calculateSMA(data, 25);
  let smaData2 = calculateSMA(data, 99);

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

  smaLine.setData(smaData);
  smaLine1.setData(smaData1);
  smaLine2.setData(smaData2);

  socket.addEventListener("open", (event) => {
    console.log("opend");
  });

  socket.send(soket_cur);

  socket.onmessage = (event) => {
    if (isJson(event.data) && data) {
      let candle = JSON.parse(event.data);
      const checkTime = candle.k.t / 1000 > data[data.length - 1].time;

      const payload = {
        time: checkTime
          ? ((candle.k.t / 1000) as Time)
          : data[data.length - 1].time,
        open: Number(candle.k.o),
        high: Number(candle.k.h),
        low: Number(candle.k.l),
        currency: candle.s,
        close: Number(candle.k.c),
        volume: Number(candle.k.v),
      };
      const index = candle.s as keyof typeof CurentPrice;

      dispatch(setCurrencyPoolItem({ currency: index, value: payload.close }));
      if (candle.s === currency.replace("/", "")) {
        dispatch(setCandleObject(payload));
        if (payload.time !== data[data.length - 1]?.time) {
          data.push(payload);
        }

        chartSeries.update(payload);

        smaData = calculateSMA(data, 7);
        smaData1 = calculateSMA(data, 25);
        smaData2 = calculateSMA(data, 99);

        smaLine.setData(smaData);
        smaLine1.setData(smaData1);
        smaLine2.setData(smaData2);
        // volumeSeries.update(getVolume([payload])[0]);
      }
    }
  };

  chartSeries.applyOptions({
    title: currency,
    priceFormat: { precision: 2 },
  });
  // chart.timeScale().subscribeVisibleLogicalRangeChange((logicalRange) => {
  //   if ((logicalRange?.from || 0) <= 10) {
  //     console.log("Load more data");
  //   }
  // });
};

const parsedChart = (data: Array<Candle>) => {
  return data.map((candle) => {
    return { ...candle, time: candle.time / 1000 };
  });
};

export const getVolume = (data: Array<Candle>) => {
  const green = "rgba(0, 150, 136, 0.8)";
  const red = "rgba(255,82,82, 0.8)";
  return data.map((candle) => ({
    time: candle.time as Time,
    value: candle.volume,
    color: candle.open <= candle.close ? green : red,
  }));
};
