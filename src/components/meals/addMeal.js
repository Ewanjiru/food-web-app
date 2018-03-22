import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mealActions from '../../actions/mealActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import toastr from 'toastr';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

let mealItemsArray = []
const ASYNC_DELAY = 500;


class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal:'',
      modalOpen: '',
      mealItems: {},
      error: '',
      startDate: '',
      multi: true,
      value: [],
      selectedMeal: ''

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNewMeal = this.addNewMeal.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.loadMealItems = this.loadMealItems.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open, meal } = nextProps;
    if (open === 'add') {
      this.setState({
        modalOpen: open,
        meal: '',
        mealItems: meal.MealItemsReducer
      })
    } else
      this.setState({
        modalOpen: ''
      })
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    const { meal } = this.state;
    this.setState({
      [name]: value
    });
  }
  onChange (value) {
		this.setState({
			value: value,
		});
  }
  
  addNewMeal() {
    const { meal } = this.state
    if (meal !== '') {
      this.props.actions.addMeal(meal);
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
  addNewMeal() {
    const { value, startDate, selectedMeal} = this.state
    if (value !== '' && startDate !== '') {
     const meal_item_keys = value.map(val => {
      return( val.key)  
      })
      this.props.actions.addMeal(startDate,selectedMeal,meal_item_keys);
      this.props.close();
    } else
      toastr.error("Fill all inputs")
  }

  render() {
    const { modalOpen, meal,mealItems, startDate } = this.state
    for (let key in mealItems) {
      if (mealItems.hasOwnProperty(key)) {
       mealItemsArray.push({
          key: key,
          value: mealItems[key]
        });
      }
    }
    return (
      <div className='new-vendor'>
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
                <h5 className="modal-title" id="exampleModalLongTitle">Add Meal</h5>
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
                      name='startDate'
                      onChange={this.handleDateChange}
                      onChange={this.handleDateChange('startDate')}
                      maxDate={moment()}
                      dateFormat="DD/MM/YYYY"
                      readOnly={true}
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
                      <div className="section"  style={{minWidth: "460px"}}>
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
                  onClick={this.addNewMeal}
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
    );
  }
}

const mapStateToProps = state => (
  {
    meal: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(mealActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddMeal);
