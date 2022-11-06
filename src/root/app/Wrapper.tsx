import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainPage from "../../modules/pages/MainPage/MainPage";
import SignIn from "../../modules/Auth/components/SignIn/SignIn";
import SignUp from "../../modules/Auth/components/SignUp/SignUp";
import { getUserSelector } from "../../modules/User/store/selectors";
import { JWT_LOCALSTORAGE_KEY } from "../../libs/utils/constants";
import { getUser } from "../../modules/User/store/actions";
import "./style.scss";

const Wrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const user = useSelector(getUserSelector);

  return (
    <div className="wrapper">
      <Switch>
      {user.id &&  <Route exact path="/main" component={MainPage} />}
        {!user.id && (
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/registration" component={SignUp} />
          </Switch>
        )}
        <Redirect to="/main" />
      </Switch>
    </div>
  );
};

export default Wrapper;
