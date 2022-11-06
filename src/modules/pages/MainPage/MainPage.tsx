import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import "./style.scss";
import {
  CurentPrice,
  currencyEnum,
  JWT_LOCALSTORAGE_KEY,
  socket,
} from "../../../libs/utils/constants";
import { AuthService } from "../../Auth/services";
import { useEffect } from "react";
import { getUserSelector } from "../../User/store/selectors";
import {
  setCurrentCurrency,
  setSocketCurrency,
} from "../../Chart/store/actions";
import { StockChart } from "../../Chart/components/StockChart";
import { TradeForm } from "../../Trade/components/TradeForm";
import { TradeHistory } from "../../Trade/components/TradeHistory/TradeHistory";
import classNames from "classnames";
import { currencySelector } from "../../Chart/store/selectors";

const authService = AuthService.getInstance();
const MainPage = () => {
  let token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const currency = useSelector(currencySelector);

  useEffect(() => {
    if (!user.id) {
      window.location.href = `${authService.APP_URL}/login`;
    }
  }, [token, user.id]);

  const handleClick = (currency: string, socketCurrency: string) => {
    dispatch(setCurrentCurrency(currency));
    dispatch(setSocketCurrency(socketCurrency));
    socket.send(socketCurrency);
  };

  return (
    <div className="main-page">
      <div className="main-page-side-menu">
        {Object.values(currencyEnum)
          .sort()
          .map((item: string, index: number) => (
            <button
              key={item}
              className={classNames("main-page-side-menu-button", {
                "main-page-side-menu-button-selected": currency === item
              })}
              onClick={() =>
                handleClick(item, Object.keys(currencyEnum)[index])
              }
            >
              {item}
            </button>
          ))}
      </div>
      <div className="main-page-body">
        <div className="main-page-body-container">
          <StockChart />
          <TradeForm />
        </div>

        <TradeHistory />
      </div>
    </div>
  );
};

export default MainPage;
