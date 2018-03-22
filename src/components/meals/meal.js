import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mealsActions from "../../actions/mealActions";
import AddMeal from "./addMeal";
import EditMeal from "./editMeal";
import DeleteMeal from './deleteMeal';

class Meals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: {},
      mealItems: {},
      modalOpen: "",
      selectedMeal: '',
      breakfast: {},
      lunch: []
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadAllMeals();
  }
  componentWillReceiveProps(nextProps) {
    const { meals, mealItems } = nextProps;

    this.setState({
      meals: Object.assign({}, this.state.meals, meals.MealReducer),
      mealItems: Object.assign(
        {},
        this.state.mealsItems,
        meals.MealItemsReducer
      )
    });
  }
  handleChange(event, meal) {
    event.preventDefault();
    const { name, id } = event.target;
    this.setState({
      modalOpen: name,
      meal,
      selectedMeal: id

    });
  }
  closeModal() {
    this.setState({
      modalOpen: ""
    });
  }

  render() {
    const { meals } = this.state;
    let mealsArray = [];
    for (let key in meals) {
      if (meals.hasOwnProperty(key)) {
        mealsArray.push({
          key: key,
          value: meals[key]
        });
      }
    }
    const { mealItems } = this.state;
    let mealItemsArray = [];
    for (let key in mealItems) {
      if (mealItems.hasOwnProperty(key)) {
        mealItemsArray.push({
          key: key,
          value: mealItems[key]
        });
      }
    }
    return (
      <div>
        <h4> Meals </h4>
        <button name="add" onClick={event => this.handleChange(event, null)}>
          {" "}
          Add Meal{" "}
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date Served</th>
              <th scope="col">Breakfast</th>
              <th scope="col">Lunch</th>
            </tr>
          </thead>
          <tbody>
            {mealsArray &&
              mealsArray.map(meal => {
                const breakfastMealItems =
                  mealItemsArray &&
                  mealItemsArray.reduce((acc, next) => {
                    if (
                      meal.value.Breakfast &&
                      meal.value.Breakfast.meal_items.includes(
                        Object.values(next)[0]
                      )
                    ) {
                      acc.push(next);
                      return acc;
                    } else {
                      return acc;
                    }
                  }, []);
                const lunchMealItems =
                  mealItemsArray &&
                  mealItemsArray.reduce((acc, next) => {
                    if (
                      meal.value.Lunch &&
                      meal.value.Lunch.meal_items.includes(
                        Object.values(next)[0]
                      )
                    ) {
                      acc.push(next);
                      return acc;
                    } else {
                      return acc;
                    }
                  }, []);
                return (
                  <tr>
                    <td>{meal.key}</td>
                    <td>
                      <button
                        id="Breakfast"
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                        name="edit"
                        onClick={event => this.handleChange(event, meal)}
                      />
                      <button
                        id="Breakfast"
                        className="fa fa-trash"
                        aria-hidden="true"
                        name="delete"
                        onClick={event => this.handleChange(event, meal)}
                      />
                      {breakfastMealItems &&
                        breakfastMealItems.map(breakfastMealItem => {
                          return <li>{breakfastMealItem.value.name}</li>;
                        })}
                    </td>
                    <td>
                      <button
                        id="Lunch"
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                        name="edit"
                        onClick={event => this.handleChange(event, meal)}
                      />
                      <button
                        id="Lunch"
                        className="fa fa-trash"
                        aria-hidden="true"
                        name="delete"
                        onClick={event => this.handleChange(event, meal)}
                      />
                      {lunchMealItems &&
                        lunchMealItems.map(lunchMealItem => {
                          return <li>{lunchMealItem.value.name}</li>;
                        })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <AddMeal open={this.state.modalOpen} close={this.closeModal} />
        <EditMeal
          meal={this.state.meal}
          selectedMeal={this.state.selectedMeal}
          open={this.state.modalOpen}
          close={this.closeModal}
        />
        <DeleteMeal
          selectedMeal={this.state.selectedMeal}
          meal={this.state.meal}
          open={this.state.modalOpen}
          close={this.closeModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meals: state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(mealsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
