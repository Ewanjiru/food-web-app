import initialState from './InitialState';
import { LOAD_MEAL } from '../actions/mealActions';
export default function MealItemsReducer(state = initialState.meals, action) {
  switch (action.type) {
    case LOAD_MEAL:
      return action.payload;
    default:
      return state;
  }
}
