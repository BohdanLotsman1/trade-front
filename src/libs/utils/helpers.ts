import { createChart, Time } from "lightweight-charts";
import { setCandleObject, setCurrencyPoolItem } from "../../modules/Chart/store/actions";
import { Candle } from "../../modules/Chart/store/types";
import { CurentPrice, socket } from "./constants";
import isJson from "./store/services/isJson";

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
  return setTimeout(fn, t);
}

export const calculateSMA = (data: any, count: number) => {
  const avg = (data: any) => {
    let sum = 0;
    data.map((item: any) => {
      sum += item.close;
    })
    return sum / data.length;
  };
  let result = [];
  for (let i = count - 1, len = data.length; i < len; i++) {
    let val = avg(data.slice(i - count + 1, i));
    result.push({ time: data[i].time, value: val });
  }
  return result;
};

export const cryptoCurrency = (
  currency: string,
  soket_cur: string,
  chartData: Array<Candle>,
  dispatch: any,
) => {
  const isChart = document.getElementById("chart");
  const p = document.createElement("div");
  const data = [...chartData];
  if (isChart) isChart.innerHTML = "";

  const chart = createChart(isChart || p, {
    height: 410,
    width: 900,
    
    rightPriceScale: {
      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
      borderVisible: false,
    },

    timeScale: {
      fixLeftEdge: true,
      timeVisible: true,
      secondsVisible: true,
    },
  });

  const chartSeries = chart.addCandlestickSeries();
  chartSeries.setData(data);

  let smaData = calculateSMA(data, 7);
  let smaData1 = calculateSMA(data, 25);
  let smaData2 = calculateSMA(data, 99);

  var smaLine = chart.addLineSeries({
    priceLineVisible: false,
    color: "red",
    lineWidth: 1,
  });

  var smaLine1 = chart.addLineSeries({
    priceLineVisible: false,
    color: "green",
    lineWidth: 1,
  });

  var smaLine2 = chart.addLineSeries({
    priceLineVisible: false,
    color: "blue",
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
      let vari = JSON.parse(event.data);
      const checkTime = vari.k.t / 1000 > data[data.length - 1].time;
      const payload = {
        time: checkTime
          ? ((vari.k.t / 1000) as Time)
          : data[data.length - 1].time,
        open: parseFloat(vari.k.o),
        high: parseFloat(vari.k.h),
        low: parseFloat(vari.k.l),
        currency: vari.s,
        close: parseFloat(vari.k.c),
      };
      const index = vari.s as keyof typeof CurentPrice;
      //CurentPrice[index] = payload.close;
      dispatch(setCurrencyPoolItem({currency: index, value:payload.close}))
      if (vari.s === currency.replace("/", "")) {
        dispatch(setCandleObject(payload))
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
      }
    }
  };

  chartSeries.applyOptions({
    title: currency,
    priceFormat: { precision: 5, minMove: 0.00001 },
  });
};
