import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import toastr from 'toastr';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as mealActions from '../../actions/mealActions';

let mealItemsArray = []
const ASYNC_DELAY = 500;

class EditMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: '',
      mealId: '',
      mealkey: '',
      selectedMeal:'',
      startDate: '',
      multi: true,
      value: [],
      mealItems: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editMenuItem = this.editMenuItem.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.loadMealItems = this.loadMealItems.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editThisMeal = this.editThisMeal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open, meals, meal, selectedMeal } = nextProps;
    if (open === 'edit') {
      this.setState({
        modalOpen: open,
        startDate: meal.key,
        mealItems: meals.MealItemsReducer,
        meal: meal,
        selectedMeal
        
      })
    } else
      this.setState({
        modalOpen: ''
      })
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


 editMenuItem() {
  const { mealName, mealId, mealkey} = this.state;
  if (mealName !== '') {
      this.props.actions.editMeal(mealName, mealId, mealkey);
      this.props.close();
 } else
   toastr.error("Fill all inputs")
  }
  handleDateChange(name) {
    return value => {
      this.setState({
        startDate: moment(value).format("YYYY-MM-DD")
      });

    }
  }
  onChange (value) {
		this.setState({
			value: value,
		});
  }
  loadMealItems (input, callback) {
    input = input.charAt(0).toUpperCase() + input.slice(1);      
      
      const mealItems = mealItemsArray.map((meal) => {
        return {
          value: meal.value.name,
          label: meal.value.name,
          key: meal.key
        }
      });
  
      const options =   mealItems.filter(meal => {
        return meal.value.substr(0, input.length) === input
      });
  
      setTimeout(() => {
        callback(null, {
          options,
          complete: true
        });
      }, 500);
    }
    editThisMeal() {
      const { value, startDate, selectedMeal,meal} = this.state
      if(meal && Object.keys(meal).length > 0){
        const meal_id = meal.value.Breakfast.meal_id
    }
      if (value !== '' && startDate !== '') {
       const meal_item_keys = value.map(val => {
        return( val.key)  
        })
        this.props.actions.editMeal(startDate, selectedMeal, meal_item_keys);
        this.props.close();
      } else
        toastr.error("Fill all inputs")
    }

  render() {
    const { modalOpen, mealName, mealId, startDate, mealItems, meal } = this.state; 
    for (let key in mealItems) {
      if (mealItems.hasOwnProperty(key)) {
       mealItemsArray.push({
          key: key,
          value: mealItems[key]
        });
      }
    }
    return (
      <div className='edit-vendor'>
        <div
          className="modal fade"
          id={`${modalOpen}-visible`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit Meal</h5>
                <button
                  id="icons"
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.props.close()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                <div className="form-group">
                    <label
                      htmlFor="date-started"
                      className="col-form-label">
                      Date Started:
                      </label>
                    <DatePicker
                      className="form-control"
                      maxDate={moment()}
                      dateFormat="DD/MM/YYYY"
                      value={startDate}
                      showDisabledMonthNavigation
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="vendor-name"
                      className="col-form-label">
                      Meal:
                      </label>
                      
                      {
                            meal && Object.keys(meal).length > 0 &&
                            <span> {Object.keys(meal.value)[0]}</span>
                             
                          
                      }
                      <select className="form-control" id="exampleSelect1" name='selectedMeal' onChange={this.handleInputChange}>
                      <option>Breakfast</option>
                      <option>Lunch</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="vendor-name"
                      className="col-form-label">
                      Meal Items:
                      </label>
                      <div className="section">
                      <Select.Async name="form-field-name" loadOptions={this.loadMealItems} multi={this.state.multi} value={this.state.value} onChange={this.onChange}/>
                      </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.editThisMeal}
                >Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.props.close()}
                > Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    meals: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(mealActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditMeal);

