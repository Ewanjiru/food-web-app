import { combineReducers } from 'redux';
import VendorsReducer from './vendorsReducer';
import LoginReducer from './loginReducer';
import MealItemsReducer from './mealItemsReducer';
import MealReducer from './mealReducer';
import CommentsReducer from './CommentsReducer';
import RatingsReducer from './RatingsReducer';

const RootReducer = combineReducers({
  VendorsReducer,
  LoginReducer,
  MealItemsReducer,
  MealReducer,
  CommentsReducer,
  RatingsReducer,
});

export default RootReducer;
