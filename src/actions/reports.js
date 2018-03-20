import { LOAD_COMMENTS, LOAD_RATINGS } from './actionTypes.js';
import firebase from '../components/Auth/firebase';
import toastr from 'toastr';

const database = firebase.database().ref();

export const loadAllComments = () => {
  return dispatch => {
    database.child('comments').on('value', snapshot => {
      dispatch({
        type: LOAD_COMMENTS,
        payload: snapshot.val()
      })
    })
  }
}
