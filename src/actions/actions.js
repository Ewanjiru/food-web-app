import * as ActionTypes from './actionTypes.js';
import firebase from '../components/Auth/firebase';
import toastr from 'toastr';

const database = firebase.database().ref().child('vendors');

export const loadAllVendors = () => {
  return dispatch => {
    database.on('value', snapshot => {
      dispatch({
        type: ActionTypes.LOAD_VENDOR,
        payload: snapshot.val()
      })
    })
  }
}

export const addVendor = (vendor) => {
  return dispatch => {
    database
      .push(vendor)
      .then(response => {
        console.log('the response is', response);
        const result = response.path;
        if (result.pieces_.length > 0) {
          toastr.success("Vendor Successfully Added")
        }
      })
      .catch(error => toastr.error("error occured:"))
  }
}

export const removeVendor = (key) => {
  return dispatch => {
    database.child(key).remove()
      .then(response => {
        console.log('the response is', response);
      })
      .catch(error => console.log("error", error));
  }
}

export const editVendor = (key, vendor) => {
  return dispatch => {
    database.child('' + key + '').update(vendor)
      .then(response => {
        console.log('the response is', response);
      })
      .catch(error => console.log("error", error));
  }
}
