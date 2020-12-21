import {combineReducers} from 'redux';
import savedItemReducers from "./reducers/savedItemReducers";

const RootReducers = combineReducers({
  savedItemReducers: savedItemReducers
});
export default RootReducers;