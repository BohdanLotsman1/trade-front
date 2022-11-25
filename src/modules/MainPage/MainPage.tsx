import { useDispatch, useSelector } from "react-redux";
import {
  currencyEnum,
  CURRENCY_LOCALSTORAGE_KEY,
  JWT_LOCALSTORAGE_KEY,
  socket,
  SOCKET_CURRENCY_LOCALSTORAGE_KEY,
} from "../../libs/utils/constants";
import { AuthService } from "../Auth/services";
import { useEffect } from "react";
import { getUserSelector } from "../User/store/selectors";
import { setCurrentCurrency, setSocketCurrency } from "../Chart/store/actions";
import { Chart } from "../Chart/components/Chart";
import { TradeForm } from "../Trade/components/TradeForm";
import { TradeHistory } from "../Trade/components/TradeHistory/TradeHistory";
import classNames from "classnames";
import { currencySelector } from "../Chart/store/selectors";
import { useStyles } from "./style";

const authService = AuthService.getInstance();

const MainPage = () => {
  const token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const currency = useSelector(currencySelector);
  const classes = useStyles();

  useEffect(() => {
    if (!user.id) {
      window.location.href = `${authService.APP_URL}/login`;
    }
  }, [token, user.id]);

  const handleClick = (currency: string) => () => {
    const socketCurrency = currency.replace("/", "").toLowerCase();
    socket.send(socketCurrency);
    dispatch(setCurrentCurrency(currency));
    dispatch(setSocketCurrency(socketCurrency));
    localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, currency);
    localStorage.setItem(SOCKET_CURRENCY_LOCALSTORAGE_KEY, socketCurrency);
  };

  return (
    <div className={classes.root}>
      <div className={classes.sideMenu}>
        {Object.values(currencyEnum)
          .sort()
          .map((item: string, index: number) => (
            <button
              key={item}
              className={classNames(classes.button, {
                [classes.selectedBtn]: currency === item,
              })}
              onClick={handleClick(item)}
            >
              {item}
            </button>
          ))}
      </div>
      <div className={classes.body}>
        <div className={classes.bodyContainer}>
          <Chart />
          <TradeForm />
        </div>
        <div className={classes.tradeHistory}>
          <TradeHistory />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
