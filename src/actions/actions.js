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
        const result = response.path;
        if (result.pieces_.length > 0) {
          toastr.success("Vendor Successfully Added")
        }
      })
      .catch(error => toastr.error(error))
  }
}

export const removeVendor = (key) => {
  return dispatch => {
    database.child(key).remove()
      .then(() => {
        toastr.success('Vendor successfully removed');
      })
      .catch(error => toastr.error(error));
  }
}

export const editVendor = (key, vendor) => {
  const { vendorName, date_created } = vendor;
  return dispatch => {
    database.child(key).once('value', snapshot => {
      if (vendorName !== snapshot.val().vendorName || date_created !== snapshot.val().date_created) {
        database.child(key).update(vendor)
          .then(response => {
            toastr.success('Vendor successfully Edited');
          })
          .catch(error => toastr.error(error));
      } else
        toastr.error('No change detected');
    })
  }
}
