import { combineReducers } from 'redux';
import VendorsReducer from './vendorsReducer';
import LoginReducer from './loginReducer';
import MealItemsReducer from './mealItemsReducer';

const RootReducer = combineReducers({
  VendorsReducer,
  LoginReducer,
  MealItemsReducer

});

export default RootReducer;
