import React from "react";
import { WorkOffOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const EmptyList = ({ title }: { title: string }) => {
  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <WorkOffOutlined sx={{ fontSize: 40, color: "#9b9b9b" }} />
      <Typography variant="h6" color="#9b9b9b">
        {title}
      </Typography>
    </Box>
  );
};
