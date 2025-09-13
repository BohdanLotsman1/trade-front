import { Trade } from "../../../store/types";
import { styles } from "../styles";
import { TradesTableBody } from "./TradesTableBody";
import { TradesTableHeader } from "./TradesTableHead";
import { Box, Table } from "@mui/material";
import { EmptyList } from "../../EmptyList";

interface OpenedTradesProps {
  trades: Array<Trade>;
  handleClick: (currency: string) => () => void;
}

export const OpenedTrades = ({ trades, handleClick }: OpenedTradesProps) => {
  const filteredTrades = trades
    .filter((item) => item.state === "OPENED")
    .sort(
      (a, b) => Date.parse(b.created_at || "") - Date.parse(a.created_at || "")
    );

  return (
    <Box sx={styles.scrollContainer}>
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
