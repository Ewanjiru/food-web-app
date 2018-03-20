import initialState from './InitialState';
import { LOAD_RATINGS } from '../actions/actionTypes';

export default function RatingsReducer(state = initialState.ratings, action) {
  switch (action.type) {
    case LOAD_RATINGS:
      return action.payload;
    default:
      return state;
  }
}