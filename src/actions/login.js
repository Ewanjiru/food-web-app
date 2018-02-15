import * as ActionTypes from './actionTypes.js';
import firebase from '../components/Auth/firebase';
import toastr from 'toastr';
import { error } from 'util';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export const userLogin = (user) => (dispatch) => {
  // const andelaEmailRegex = /@andela.com$/
  // if (!andelaEmailRegex.test(user.email.toString())) {
  //   console.log('i got here');
  //   return toastr.error('error')
  // } else
  return({
  type: ActionTypes.USER_LOGIN,
  payload: user
})}


export  const performLogin = ()=> (
   dispatch => {
    auth.signInWithRedirect(provider)
  }
)

