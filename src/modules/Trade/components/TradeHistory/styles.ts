export const styles = {
  table: {
    border: "1px solid white",
    width: " 100%",
    position: "relative",
  },
  header: {
    top: 0,
    position: "sticky",
    padding: 10,
    backgroundColor: "rgb(118, 118, 118)",
  },
  body: {
    fontWeight: 600,
  },
  title: {
    padding: "5px 15px",
    fontWeight: 700,
    color: "white",
    fontSize: "large",
    height: 30,
  },
  scrollContainer: {
    height: "calc(255px - 30px)",
    overflow: "auto",
  },
  win: {
    backgroundColor: "#26a69a",
  },
  lose: {
    backgroundColor: "#ef5350",
  },
  currency: {
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
  closeBtn: {
    padding: "0 4px",
    border: "none",
    color: "white",
    backgroundColor: "red",
    borderRadius: 5,
    cursor: "pointer",
    boxSizing: "content-box",
    fontWeight: 600,
    "&:hover": {
      boxShadow: "0px 5px 6px #00000029",
    },
  },
  item: {
    border: "1px solid #00000029",
  },
  headCell: {
    fontWeight: 600,
    padding: "16px 8px",
  },
  cell: {
    padding: "16px 8px",
  },
};
