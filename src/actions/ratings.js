import { LOAD_COMMENTS, LOAD_RATINGS } from './actionTypes.js';
import firebase from '../components/Auth/firebase';
import toastr from 'toastr';

const database = firebase.database().ref();

export const loadAllRatings = () => {
  return dispatch => {
    database.child('ratings').on('value', snapshot => {
      dispatch({
        type: LOAD_RATINGS,
        payload: snapshot.val()
      })
    })
  }
}
