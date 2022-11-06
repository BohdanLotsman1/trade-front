import { combineReducers } from 'redux';
import chartReduser from './chartReduser';

export default combineReducers({
    chart: chartReduser,
});