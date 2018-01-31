import { combineReducers } from 'redux';
import VendorsReducer from './vendorsReducer';

const RootReducer = combineReducers({
  VendorsReducer,
});

export default RootReducer;
