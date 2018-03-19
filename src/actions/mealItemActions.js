import firebase from '../components/Auth/firebase';
import toastr from 'toastr';

const database = firebase.database().ref().child('meal_items');

export const LOAD_MEAL_ITEM = 'LOAD_MEAL_ITEM';

export const loadAllMealItems = () => {
  return dispatch => {
    database.on('value', snapshot => {
      dispatch({
        type: LOAD_MEAL_ITEM,
        payload: snapshot.val()
      })
    })
  }
}
export const addMealItem = (mealItem) => {
  return dispatch => {
    const ref = database.push();
    database
      .child(ref.key).set({'name': mealItem})
      .then(response => {
        const result = response.path;
        if (result.pieces_.length > 0) {
          toastr.success("Meal Item Successfully Added")
        }
      })
      .catch(error => toastr.error(error))
  }
}
export const editMealItem = (meal_id, name) => {
  return dispatch => {
    database.child(meal_id).once('value', snapshot => {
      if (name !== snapshot.val().name) {
        database.child(meal_id).set({ 'name':name})
          .then(response => {
            toastr.success('Menu Item successfully Edited');
          })
          .catch(error => toastr.error(error));
      } else
        toastr.error('No change detected');
    })
  }
}
export const deleteMealItem = (key) => {
  return dispatch => {
    database.child(key).remove()
      .then(() => {
        toastr.success('Menu Item successfully removed');
      })
      .catch(error => toastr.error(error));
  }
}
