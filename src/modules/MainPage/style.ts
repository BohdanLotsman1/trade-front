import { makeStyles } from "@material-ui/core/styles";
import { height } from "@mui/system";

export const useStyles = makeStyles({
    root: {
      display: "flex",
      width: "100vw",
      height: "100%",
    },
  
    sideMenu: {
      display: "flex",
      flexDirection: "column",
      width: 150,
      height: "calc(100vh - 40px)",
      boxSizing: "content-box",
    },
    button: {
      boxSizing: "content-box",
      width: "100%",
      height: 70,
      color: "black",
      fontWeight: 700,
      backgroundColor: "#909090",
      border: "1px solid gray",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid rgb(202, 202, 202)",
      },
    },
    selectedBtn: {
      color: "white",
      border: "1px solid rgb(202, 202, 202)",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      width: "calc(100% - 150px)",
    },
    bodyContainer: {
      width: "100%",
      display: "flex",
      minHeight: 250,
      height: "calc(100% - 255px)",
    },
    tradeHistory: {
      width: "100%",
      display: "flex",
      height: 255,
      minHeight: 255,
      justifyContent: "center",
    },
  });