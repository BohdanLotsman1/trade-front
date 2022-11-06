import moment from "moment";
import { Trade } from "../../store/types";

interface ClosedTradesProps {
  trades: Array<Trade>;
  handleClick:(currency:string) => void;
}

export const ClosedTrades = ({ trades, handleClick}: ClosedTradesProps) => {
  return (
    <div className="trade-history-closed">
      <div className="trade-history-title">CLOSED</div>
      <div className="trade-history-scroll-container">
        <table className="trade-history-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Bet</th>
              <th>Bet direction</th>
              <th>Time</th>
              <th>Result</th>
              <th>Price on open</th>
              <th>Price on close</th>
              <th>Closed at</th>
            </tr>
          </thead>
          <tbody>
            {trades
              .filter((item) => item.state === "CLOSED")
              .map((trade: Trade) => (
                <tr
                  className={
                    trade.result === "WIN"
                      ? "trade-history-table-win"
                      : "trade-history-table-lose"
                  }
                  
                >
                  <td onClick={()=>handleClick(trade.currency)} className={"trade-history-table-currency"}>{trade.currency} </td>
                  <td>{trade.trade_price}$</td>
                  <td>{trade.direction ? "BUY/LONG" : "SELL/SHORT"}</td>
                  <td>{trade.time}min.</td>
                  <td>{trade.result}</td>
                  <td>{trade.price_on_open}</td>
                  <td>{trade.price_on_close?.toFixed(4)}</td>
                  <td>{moment(trade.end_time).format('MMMM Do YYYY, HH:mm:ss')}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
