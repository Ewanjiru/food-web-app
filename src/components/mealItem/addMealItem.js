import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mealItemsActions from '../../actions/mealItemActions';
import toastr from 'toastr';


class AddMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: '',
      mealItem: '',
      error: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNewMealItem = this.addNewMealItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps;
    if (open === 'add') {
      this.setState({
        modalOpen: open,
        mealItem: ''
      })
    } else
      this.setState({
        modalOpen: ''
      })
  }

  handleInputChange(event) {
    const { value } = event.target;
    const { mealItem } = this.state;
    this.setState({
      mealItem: value
    });
  }
  
  addNewMealItem() {
    const { mealItem } = this.state
    console.log('mmmmmm', mealItem);
    if (mealItem !== '') {
      this.props.actions.addMealItem(mealItem);
      this.props.close();
    } else
      toastr.error("Fill all inputs")
  }

  render() {
    const { modalOpen, mealItem } = this.state
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
                <h5 className="modal-title" id="exampleModalLongTitle">Add Meal Item</h5>
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
                      htmlFor="vendor-name"
                      className="col-form-label">
                      Meal Item:
                      </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="vendorName"
                      value={mealItem}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.addNewMealItem}
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
    mealItems: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(mealItemsActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddMenuItem);
