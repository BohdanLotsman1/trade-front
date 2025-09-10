import { Candle } from "../../modules/Chart/store/types";

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

export const calculateAvg = (candles: Array<Candle>) => {
  return (
    candles.reduce((acc, item: Candle) => {
      return acc + item.close;
    }, 0) / candles.length
  );
};

export const calculateSMA = (data: Array<Candle>, count: number) => {
  const result = [];
  for (let i = count - 1, len = data.length; i < len; i++) {
    const val = calculateAvg(data.slice(i - count + 1, i));
    result.push({ time: data[i].time, value: val });
  }
  return result;
};
