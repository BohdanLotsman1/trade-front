import React, {
  createContext,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { currencySelector } from "../../../modules/Chart/store/selectors";

export const WebSocketContext = createContext<{ socket: WebSocket | null }>({
  socket: null,
});

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currency = useSelector(currencySelector);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useLayoutEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com/stream");
    ws.addEventListener("open", (event) => {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: ["!miniTicker@arr@3000ms"],
          id: 1,
        })
      );
      setSocket(ws);
    });

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (!socket || !currency || socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: [currency.toLowerCase() + "@kline_1m"],
        id: 1,
      })
    );
    return () => {
      socket.send(
        JSON.stringify({
          method: "UNSUBSCRIBE",
          params: [currency + "@kline_1m"],
          id: 1,
        })
      );
    };
  }, [socket, currency]);
  return (
    <WebSocketContext.Provider value={{ socket: socket ?? null }}>
      {children}
    </WebSocketContext.Provider>
  );
};
