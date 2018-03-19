import { combineReducers } from 'redux';
import VendorsReducer from './vendorsReducer';
import LoginReducer from './loginReducer';
import MealItemsReducer from './mealItemsReducer';
import MealReducer from './mealReducer';

const RootReducer = combineReducers({
  VendorsReducer,
  LoginReducer,
  MealItemsReducer,
  MealReducer

});

export default RootReducer;
