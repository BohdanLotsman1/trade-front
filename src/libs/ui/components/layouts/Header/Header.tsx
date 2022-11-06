import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../../../modules/User/store/selectors";
import "./style.scss";
import { AuthService } from "../../../../../modules/Auth/services";
import { JWT_LOCALSTORAGE_KEY } from "../../../../utils/constants";
import { logoutUser } from "../../../../../modules/Auth/store/actions/logoutActions";
import { refillWallet } from "../../../../../modules/User/store/actions";

const authService = AuthService.getInstance();

const Header = () => {
  let token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);

  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();
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
    <div className="header main">
      <div className="siteName">
        <Link to={"/main"} className="link" onClick={clickHandler}>
          Trade.io
        </Link>
      </div>
      <div className="main">
        {!user.id && (
          <div className="right">
            <Link to={"/registration"} className="link">
              SignUp
            </Link>
            <Link to={"/login"} className="link">
              SignIn
            </Link>
          </div>
        )}
        {user.id && (
          <>
            <div className="link">
              <div>{user.name}: {user.wallet.amount_of_money}$</div>
              <button className="header-button" onClick={handleRefill}>Refill</button>
            </div>
            <div className="right">
              <div>
                <Link to={"#"} onClick={handleLogout} className="link">
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
