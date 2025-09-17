import { styles } from "../styles";
import { TradesTableBody } from "./TradesTableBody";
import { TradesTableHeader } from "./TradesTableHead";
import { Box, CircularProgress, Table } from "@mui/material";
import { EmptyList } from "../../EmptyList";
import { useSelector } from "react-redux";
import {
  tradesLoadingSelector,
  tradesSelector,
} from "../../../store/selectors";

interface OpenedTradesProps {
  handleClick: (currency: string) => () => void;
}

export const OpenedTrades = ({ handleClick }: OpenedTradesProps) => {
  const trades = useSelector(tradesSelector);
  const loading = useSelector(tradesLoadingSelector);

  const filteredTrades = trades
    .filter((item) => item.state === "OPENED")
    .sort(
      (a, b) => Date.parse(b.created_at || "") - Date.parse(a.created_at || "")
    );

  return (
    <Box sx={styles.scrollContainer}>
      {loading && <CircularProgress />}
      {filteredTrades.length === 0 ? (
        <EmptyList title="No opened trades" />
      ) : (
        <Table sx={styles.table}>
          <TradesTableHeader />
          <TradesTableBody trades={filteredTrades} handleClick={handleClick} />
        </Table>
      )}
    </Box>
  );
};
