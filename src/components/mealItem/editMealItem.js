import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as mealItemsActions from '../../actions/mealItems/mealItem';

class EditMealItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: '',
      mealId: '',
      mealkey: '',
      mealName:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editMenuItem = this.editMenuItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open, mealItem } = nextProps;
    if (open === 'edit') {
      this.setState({
        modalOpen: open,
        mealkey: mealItem.key,
        mealId:mealItem.value["meal-id"],
        mealName: mealItem.value.name
      })
    } else
      this.setState({
        modalOpen: ''
      })
  }

  handleInputChange(event) {
    const { value } = event.target;
    const { mealName } = this.state;
    this.setState({
      mealName: value
    });
  }


 editMenuItem() {
  const { mealName, mealId, mealkey } = this.state;
  if (mealName !== '') {
      this.props.actions.editMealItem(mealName, mealId, mealkey);
      this.props.close();
 } else
   toastr.error("Fill all inputs")
  }

  render() {
    const { modalOpen, mealName, mealId } = this.state;
    return (
      <div className='edit-vendor' >
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
                <h5 className="modal-title" id="exampleModalLongTitle">Edit Meal Item</h5>
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
                      className="col-form-label"
                    >Meal Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="vendorName"
                      value={mealName}
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
                  onClick={this.editMenuItem}
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
    mealItems: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(mealItemsActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditMealItem);

