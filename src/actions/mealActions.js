import firebase from '../components/Auth/firebase';
import toastr from 'toastr';

const database = firebase.database().ref().child('meals');

export const LOAD_MEAL = 'LOAD_MEAL';

export const loadAllMeals = () => {
  return dispatch => {
    database.on('value', snapshot => {
      dispatch({
        type: LOAD_MEAL,
        payload: snapshot.val()
      })
    })
  }
}
export const addMeal = (startDate,selectedMeal,meal_item_keys) => {
  return dispatch => {
    const ref = database.push();
    database.child(startDate).child(selectedMeal).set({'meal_id': ref.key, 'meal_items':meal_item_keys})
      .then(response => {
        const result = response.path;
       
        if (result.pieces_.length > 0) {
          toastr.success("Meal Item Successfully Added")
        }
      })
      .catch(error => toastr.error(error))
  }
}
export const editMeal = (startDate, selectedMeal, meal_item_keys) => {
  return dispatch => {
    database.child(startDate).child(selectedMeal).child('meal_items').set(meal_item_keys)
    .then((res)=>{
      console.log('res', res);

    })
    .catch((err)=>{
      console.log('err',err);
    })
  }
}
export const deleteMeal = (meal, selectedMeal) => {
  if(meal && Object.keys(meal).length > 0){
}
  return dispatch => {
    database.child(meal.key).child(selectedMeal).remove()
      .then(() => {
        toastr.success('Menu Item successfully removed');
      })
      .catch(error => toastr.error(error));
  }
}
