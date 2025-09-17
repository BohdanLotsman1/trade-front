import { Box } from "@mui/material";
import React from "react";

export const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: 400,
        padding: 4,
        margin: 2,
        borderRadius: 5,
        boxShadow: "0px 0px 2px 2px #00000029",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};
