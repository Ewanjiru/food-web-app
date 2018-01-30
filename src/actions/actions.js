import * as ActionTypes from './actionTypes.js';
import firebase from '../components/Auth/firebase';

const database = firebase.database().ref().child('vendors');

export function loadAllVendors() {
  return dispatch => {
    database.on('value', snapshot => {
      dispatch({
        type: ActionTypes.LOAD_VENDOR,
        payload: snapshot.val()
      })
    })
  }
}