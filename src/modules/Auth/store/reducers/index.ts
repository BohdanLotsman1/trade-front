import { combineReducers } from 'redux';
import SignUpReducer from './register';
import SignInReducer from './login';
import LogoutReducer from './logout';

export default combineReducers({
    signUp: SignUpReducer,
    signIn: SignInReducer,
    logOut: LogoutReducer
});
