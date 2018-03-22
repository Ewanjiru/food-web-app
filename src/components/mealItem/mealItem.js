import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mealItemsActions from '../../actions/mealItemActions';
import AddMealItem from './addMealItem';
import EditMealItem from './editMealItem';
import DeleteMealItem from './deleteMealItem';

class MealItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealItems: {},
      mealItem: '',
      modalOpen: ''

    }
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {
    this.props.actions.loadAllMealItems();
  }
  componentWillReceiveProps(nextProps) {
    const { mealItems } = nextProps;
    this.setState({
      mealItems: Object.assign({}, this.state.mealItems, mealItems.MealItemsReducer)
    })
  }
  handleChange(event, mealItem) {
    event.preventDefault();
    const { name } = event.target;
    this.setState({
      modalOpen: name,
      mealItem
    })
  }
  closeModal() {
    this.setState({
      modalOpen: ''
    })
  }

  render() {
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
        <h4> Meal Items </h4>
        <button
          name="add"
          onClick={(event) => this.handleChange(event, null)}
        > Add Meal Item </button>
        <ul className="list-group">
          {
            mealItemsArray.map(mealItem => {
              return (
                <div key={mealItem.key}>
                  <li className="list-group-item">{mealItem.value.name}
                    <button
                      id="icons"
                      className="fa fa-pencil-square-o"
                      aria-hidden="true"
                      name="edit"
                      onClick={(event) => this.handleChange(event, mealItem)}
                    />
                    <button
                      id="icons"
                      className="fa fa-trash"
                      aria-hidden="true"
                      name="delete"
                      onClick={(event) => this.handleChange(event, mealItem)}
                    />
                  </li>
                  <AddMealItem
                    open={this.state.modalOpen}
                    close={this.closeModal}
                  />
                  <EditMealItem
                    mealItem={this.state.mealItem}
                    open={this.state.modalOpen}
                    close={this.closeModal}
                  />
                  <DeleteMealItem
                    mealItem={this.state.mealItem}
                    open={this.state.modalOpen}
                    close={this.closeModal}
                  />

                </div>
              )
            })
          }
        </ul>

      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    mealItems: state,
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(mealItemsActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MealItems);
