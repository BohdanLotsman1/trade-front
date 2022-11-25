import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  header: {
    backgroundColor: "gray",
    display: "flex",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 27,
  },
  refillButton: {
    display: "flex",
    alignSelf: "center",
    marginLeft: 5,
    fontSize: 15,
    height: 30,
    backgroundColor: "rgb(127, 214, 178)",
    padding: "0 8px",
    cursor: "pointer",
    alignItems: "center",
    border: "none",
    borderRadius: 5,
    fontWeight: 600,
  },
  siteName: {
    marginLeft: 100,
  },
  navLinks: {
    display: "flex",
  },
  rightSide: {
    display: "flex",
    backgroundColor: "transparent",
    marginRight: 50,
  },
  link: {
    display: "flex",
    marginRight: 30,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)",
    textDecoration: 'none',
    "&:hover": {
      color: "rgb(87, 87, 87)",
    },
  },
  highlightedLink: {
    color: "rgb(255, 255, 255)",
  },
  headerText: {
    display: "flex",
    marginRight: 30,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)",
  },
  flex: {
    display: "flex",
  },
});
