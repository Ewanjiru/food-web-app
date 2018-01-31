import * as ActionTypes from './actionTypes.js';
import firebase from '../components/Auth/firebase';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export function userLogin() {
  return dispatch => {
    auth.signInWithRedirect((provider) => {
      .then((result) =>{
        dispatch({
          type: ActionTypes.USER_LOGIN,
          payload: result.user

        })
      })
    })
  }
}
