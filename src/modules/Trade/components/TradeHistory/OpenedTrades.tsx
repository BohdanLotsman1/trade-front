import Item from "antd/lib/list/Item";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyPoolSelector } from "../../../Chart/store/selectors";
import { getWallet } from "../../../User/store/actions";
import { closeTrade, getTrades } from "../../store/actions";
import { Trade } from "../../store/types";

interface OpenedTradesProps {
  trades: Array<Trade>;
  handleClick: (currency: string) => void;
}

export const OpenedTrades = ({ trades, handleClick }: OpenedTradesProps) => {
  const currencyPool = useSelector(currencyPoolSelector);
  const dispatch = useDispatch();

   useEffect(() => {
    trades
      .filter((item) => item.state === "OPENED")
      .map((trade: Trade) => {
        if (moment(trade.end_time).format() === moment().format()) {
          dispatch(getTrades(trade.user_id));
          dispatch(getWallet(trade.user_id));
        }
      });
  }, [currencyPool]);

  const handleClose = (id: string) => {
    dispatch(closeTrade(id));
  }

  return (
    <div className="trade-history-opened">
      <div className="trade-history-title">OPENED</div>
      <div className="trade-history-scroll-container">
        <table className="trade-history-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Bet</th>
              <th>Bet direction</th>
              <th>Time</th>
              <th>Price</th>
              <th>Time left</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trades
              .sort(
                (a, b) =>
                  Date.parse(b.created_at || "") -
                  Date.parse(a.created_at || "")
              )
              .filter((item) => item.state === "OPENED")
              .map((trade: Trade) => (
                <tr
                  className={
                    trade.direction
                      ? trade.price_on_open <
                        currencyPool[
                          trade.currency.replace(
                            "/",
                            ""
                          ) as keyof typeof currencyPool
                        ]
                        ? "trade-history-table-win"
                        : "trade-history-table-lose"
                      : trade.price_on_open >
                        currencyPool[
                          trade.currency.replace(
                            "/",
                            ""
                          ) as keyof typeof currencyPool
                        ]
                      ? "trade-history-table-win"
                      : "trade-history-table-lose"
                  }
                >
                  <td
                    onClick={() => handleClick(trade.currency)}
                    className={"trade-history-table-currency"}
                  >
                    {trade.currency}
                  </td>
                  <td>{trade.trade_price}$</td>
                  <td>{trade.direction ? "BUY/LONG" : "SELL/SHORT"}</td>
                  <td>{trade.time}min.</td>
                  <td>{trade.price_on_open}$</td>
                  <td>{moment.utc(moment(trade.end_time).diff( moment())).format("HH:mm:ss")}</td>
                  <td>
                    <button
                      className="trade-history-table-button"
                      onClick={() => handleClose(trade.id || '')}
                    >
                      Close
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
