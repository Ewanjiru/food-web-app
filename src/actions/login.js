import * as ActionTypes from './actionTypes.js';
import firebase from '../components/Auth/firebase';
import toastr from 'toastr';
import { error } from 'util';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export const userLogin = (user) => (dispatch) => {
  window.localStorage.setItem("Token", user.refreshToken);
  return dispatch({
    type: ActionTypes.USER_LOGIN,
    payload: user
  })
}

export const performLogin = () => (
  dispatch => {
    auth.signInWithRedirect(provider)
  }
)

export const performLogout = () => (
  dispatch => {
    auth.signOut()
      .then(() => {
        window.localStorage.setItem("Token", null);
        dispatch({
          type: ActionTypes.USER_LOGOUT,
          error: false
        })
      }).catch(error => {
        dispatch({
          type: ActionTypes.USER_LOGOUT,
          error: true
        })
        toastr.error(error);
      })
  }
)
