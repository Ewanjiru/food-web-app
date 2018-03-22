import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mealActions from '../../actions/mealActions';

class DeleteMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: '',
      selectedMeal: ''
    }
    this.deleteThisMeal = this.deleteThisMeal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps;
    if (open === 'delete') {
      this.setState({
        modalOpen: open
      })
    } else
      this.setState({
        modalOpen: ""
      })
  }

  deleteThisMeal() {
    const { meal, selectedMeal } = this.props;
    this.props.actions.deleteMeal(meal, selectedMeal);
    this.props.close();
  }

  render() {
    return (
      <div className="delete-vendors">
        <div className="modal fade"
          id={`${this.state.modalOpen}-visible`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  id="icons"
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close" onClick={() => this.props.close()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h4> Are you sure to delete this meal? </h4>
                <p>This action cannot be reversed.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.deleteThisMeal}
                >Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.props.close()}
                > No
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
    vendors: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(mealActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMeal);
