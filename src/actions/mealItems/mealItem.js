import firebase from '../../components/Auth/firebase';
import toastr from 'toastr';

const database = firebase.database().ref().child('meal-items');

export const LOAD_MEAL_ITEM = 'LOAD_MEAL_ITEM';

export const loadAllMealItems = () => {
  return dispatch => {
    database.on('value', snapshot => {
      console.log('snapshot',snapshot.val() )
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
      .child(ref.key).set({'meal-id': ref.key, 'name':mealItem})
      .then(response => {
        const result = response.path;
        if (result.pieces_.length > 0) {
          toastr.success("Meal Item Successfully Added")
        }
      })
      .catch(error => toastr.error(error))
  }
}
export const editMealItem = (mealName, mealId, mealkey) => {
  mealId = ["meal-id"]
  mealName = name
  return dispatch => {
    database.child(mealkey).once('value', snapshot => {
      console.log('snapshot', snapshot.val());
      if (name !== snapshot.val().name) {
        database.child(mealkey).update({["meal-id"]: mealId, name:mealName})
          .then(response => {
            console.log('res', response);
            toastr.success('Menu Item successfully Edited');
          })
          .catch(error => toastr.error(error));
      } else
        toastr.error('No change detected');
    })
  }
}
export const deleteMealItem = (key) => {
  console.log('key',key);
  return dispatch => {
    database.child(key).remove()
      .then(() => {
        toastr.success('Menu Item successfully removed');
      })
      .catch(error => toastr.error(error));
  }
}
