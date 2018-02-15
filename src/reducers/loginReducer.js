import { USER_LOGIN } from '../actions/actionTypes';

export default function LoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
    console.log('login', action.payload)
      return action.payload;
    default:
      return state;
  }
}
