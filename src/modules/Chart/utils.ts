import { Time } from "lightweight-charts";
import { Candle } from "./store/types";

export const parsedChart = (data: Array<Candle>) => {
  return data?.map((candle) => {
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
