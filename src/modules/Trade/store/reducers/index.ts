import { combineReducers } from 'redux';
import tradeReduser from './tradeReduser';

export default combineReducers({
    trade: tradeReduser,
});