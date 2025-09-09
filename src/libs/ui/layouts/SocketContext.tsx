import React, { createContext, useState, useLayoutEffect } from "react";

export const WebSocketContext = createContext<{ socket: WebSocket | null }>({
  socket: null,
});

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useLayoutEffect(() => {
    const ws = new WebSocket("ws://localhost:7001");
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);
  return (
    <WebSocketContext.Provider value={{ socket: socket ?? null }}>
      {children}
    </WebSocketContext.Provider>
  );
};
