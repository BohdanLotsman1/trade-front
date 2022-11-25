import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../../../modules/User/store/selectors";
import { AuthService } from "../../../../../modules/Auth/services";
import { JWT_LOCALSTORAGE_KEY } from "../../../../utils/constants";
import { logoutUser } from "../../../../../modules/Auth/store/actions/logoutActions";
import { refillWallet } from "../../../../../modules/User/store/actions";
import { useStyles } from "./styles";
import classNames from "classnames";

const authService = AuthService.getInstance();

const Header = () => {
  const token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  const classes = useStyles();
  const user = useSelector(getUserSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  const isWallet = location.pathname === '/wallet';
  const isMain = location.pathname === '/main';
  const isTrading = location.pathname === '/trading';
  const isRegistration = location.pathname === '/registration';
  const isLogin = location.pathname === '/login';

  const clickHandler = () => {
    if (!token) {
      window.location.href = `${authService.APP_URL}/login`;
    }
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleRefill = () => {
    dispatch(refillWallet(user.wallet.id))
  }

  return (
    <div className={classes.header}>
      <div className={classes.siteName}>
        <Link to={"/main"} className={classNames(classes.link, {[classes.highlightedLink]: isMain})} onClick={clickHandler}>
          Trade.io
        </Link>
      </div>
      <div className={classes.navLinks}>
        <Link to={"/wallet"} className={classNames(classes.link, {[classes.highlightedLink]: isWallet})} onClick={clickHandler}>
          My wallet
        </Link>
        <Link to={"/trading"} className={classNames(classes.link, {[classes.highlightedLink]: isTrading})} onClick={clickHandler}>
          Trading
        </Link>
      </div>
      <div className={classes.flex}>
        {!user.id && (
          <div className={classes.rightSide}>
            <Link to={"/registration"} className={classNames(classes.link, {[classes.highlightedLink]: isRegistration})}>
              SignUp
            </Link>
            <Link to={"/login"} className={classNames(classes.link, {[classes.highlightedLink]: isLogin})}>
              SignIn
            </Link>
          </div>
        )}
        {user.id && (
          <>
            <div className={classes.headerText}>
              <div>{user.name}: {user.wallet.amount_of_money}$</div>
              <button className={classes.refillButton} onClick={handleRefill}>Refill</button>
            </div>
            <div className={classes.rightSide}>
              <div>
                <Link to={"#"} onClick={handleLogout} className={classes.link}>
                  Logout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
