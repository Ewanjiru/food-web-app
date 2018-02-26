import initialState from './InitialState';
import { LOAD_MEAL_ITEM } from '../actions/mealItems/mealItem';
export default function MealItemsReducer(state = initialState.mealItems, action) {
  switch (action.type) {
    case LOAD_MEAL_ITEM:
      return action.payload;
    default:
      return state;
  }
}
