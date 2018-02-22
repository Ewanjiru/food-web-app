import { USER_LOGIN, USER_LOGOUT } from '../actions/actionTypes';

export default function LoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return action.error === false ? {} : state;
    default:
      return state;
  }
}
