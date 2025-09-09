import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../../modules/User/store/selectors";
import { logoutUser } from "../../../../modules/Auth/store/actions/logoutActions";
import "./style.scss";

import classNames from "classnames";
import { Box } from "@mui/material";
import { AccountAvatar } from "./AccountAvatar";
import { CurrencySelector } from "./CurrencySelector";

const Header = () => {
  const user = useSelector(getUserSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  const isRegistration = location.pathname === "/registration";
  const isLogin = location.pathname === "/login";

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
        <CurrencySelector />
        {!user?.id && !user?.loading && (
          <div className="rightSide">
            <Link
              to={"/registration"}
              className={classNames("link", {
                highlightedLink: isRegistration,
              })}
            >
              SignUp
            </Link>
            <Link
              to={"/login"}
              className={classNames("link", {
                highlightedLink: isLogin,
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
