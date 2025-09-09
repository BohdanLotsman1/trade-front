import React, { useLayoutEffect } from "react";
import Header from "./Header/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { getMe } from "../../../modules/User/store/actions";
import { useDispatch } from "react-redux";
import { WebSocketProvider } from "./SocketContext";

const Wrapper = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getMe() as any);
  }, []);

  return (
    <Box>
      <WebSocketProvider>
        <Header />
        <Box className="wrapper">
          <Outlet />
        </Box>
      </WebSocketProvider>
    </Box>
  );
};

export default Wrapper;
