import { useContext, useEffect } from "react";
import { WebSocketContext } from "../../../libs/ui/layouts/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { chartDataSelector, currencySelector } from "../store/selectors";
import { calculateAvg } from "../../../libs/utils/helpers";
import { setCandleObject, setCurrencyPool } from "../store/actions";
import { getVolume } from "../utils";

export const useChartSocketMessages = ({
  candlestickChart,
  volumeChart,
  smaLines,
}: {
  candlestickChart: any;
  volumeChart: any;
  smaLines: any[];
}) => {
  const { socket } = useContext<any>(WebSocketContext);
  const chartData = useSelector(chartDataSelector);
  const currencyPair = useSelector(currencySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = [...chartData];

    if (!socket || !candlestickChart || !volumeChart || !smaLines.length)
      return;
    console.log("message");

    socket.onmessage = (event: MessageEvent) => {
      const socketData = JSON.parse(event.data);

      const isSelectedCurrency = socketData.stream?.includes(
        currencyPair.replace("/", "").toLowerCase()
      );

      if (socketData?.stream === "!miniTicker@arr@3000ms") {
        const pool = socketData?.data?.map((item: any) => ({
          currency: item.s,
          value: Number(item.c),
        }));
        dispatch(setCurrencyPool(pool) as any);
      }

      if (chartData.length && isSelectedCurrency) {
        let candle = socketData?.data;
        if (!candle) return;

        const time = candle.k.t / 1000;
        const checkTime = time > chartData[chartData.length - 1]?.time;

        const payload = {
          time: checkTime ? time : chartData[chartData.length - 1]?.time,
          open: Number(candle.k.o),
          high: Number(candle.k.h),
          low: Number(candle.k.l),
          currency: candle.s,
          close: Number(candle.k.c),
          volume: Number(candle.k.v),
        };

        if (candle.s === currencyPair.replace("/", "")) {
          dispatch(setCandleObject(payload) as any);

          if (payload.time !== data[data.length - 1]?.time) {
            data.push(payload);
          }

          candlestickChart.update(payload);
          const lastIndex = data.length - 1;

          smaLines[0].update({
            time: data[lastIndex].time,
            value: calculateAvg(data.slice(lastIndex - 7 + 1, lastIndex + 1)),
          });

          smaLines[1].update({
            time: data[lastIndex].time,
            value: calculateAvg(data.slice(lastIndex - 25 + 1, lastIndex + 1)),
          });

          smaLines[2].update({
            time: data[lastIndex].time,
            value: calculateAvg(data.slice(lastIndex - 99 + 1, lastIndex + 1)),
          });

          volumeChart.update(getVolume([payload])[0]);
        }
      }
    };
    return () => {
      socket.onmessage = null;
    };
  }, [
    socket,
    candlestickChart,
    volumeChart,
    smaLines,
    chartData.length,
    chartData,
    currencyPair,
    dispatch,
  ]);
};
