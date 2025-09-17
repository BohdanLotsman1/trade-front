import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../../modules/User/store/selectors";
import { logoutUser } from "../../../../modules/Auth/store/actions/logoutActions";
import "./style.scss";

import classNames from "classnames";
import { Box } from "@mui/material";
import { AccountAvatar } from "../../components/AccountAvatar";
import { CurrencySelector } from "../../components/CurrencySelector";

const Header = () => {
  const user = useSelector(getUserSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  const isRegistrationPage = location.pathname === "/registration";
  const isLoginPage = location.pathname === "/login";
  const isMainPage = location.pathname === "/";

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="header">
      <div className="siteName">
        <Link to={"/"} className={"link"}>
          Trade.io
        </Link>
      </div>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isMainPage && <CurrencySelector />}
        {!user?.id && !user?.loading && (
          <div className="rightSide">
            <Link
              to={"/registration"}
              className={classNames("link", {
                highlightedLink: isRegistrationPage,
              })}
            >
              SignUp
            </Link>
            <Link
              to={"/login"}
              className={classNames("link", {
                highlightedLink: isLoginPage,
              })}
            >
              SignIn
            </Link>
          </div>
        )}
        {user.id && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <div className="headerText">
              <div>Balance: {user.wallet.amount_of_money}$</div>
            </div>
            <div className="rightSide">
              <AccountAvatar user={user} onLogout={handleLogout} />
            </div>
          </Box>
        )}
      </Box>
    </div>
  );
};
export default Header;
