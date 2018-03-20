import initialState from './InitialState';
import { LOAD_COMMENTS } from '../actions/actionTypes';

export default function CommentsReducer(state = initialState.comments, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}