import { combineReducers } from 'redux';
import VendorsReducer from './vendorsReducer';
import LoginReducer from './loginReducer';

const RootReducer = combineReducers({
  VendorsReducer,
  LoginReducer
});

export default RootReducer;
