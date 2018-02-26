import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from '../../actions/actions.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import toastr from 'toastr';
import 'react-datepicker/dist/react-datepicker.css';

class AddVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: '',
      vendorName: '',
      startDate: '',
      error: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNewVendor = this.addNewVendor.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps;
    if (open === 'add') {
      this.setState({
        modalOpen: open,
        vendorName: '',
        startDate: ''
      })
    } else
      this.setState({
        modalOpen: ""
      })
  }

  handleInputChange(event) {
    const { value } = event.target;
    const { vendorName } = this.state;
    this.setState({
      vendorName: value
    });
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  addNewVendor() {
    const { vendorName, startDate } = this.state
    if (vendorName !== '' && startDate !== '') {
      const date_created = moment(startDate).format("DD/MM/YYYY");
      const vendorDetails = { vendorName, date_created }
      this.props.actions.addVendor(vendorDetails);
      this.props.close();
    } else
      toastr.error("Fill all inputs")
  }

  render() {
    const { modalOpen, vendorName, startDate } = this.state
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
                <h5 className="modal-title" id="exampleModalLongTitle">CREATE VENDOR</h5>
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
                      Vendor Name:
                      </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="vendorName"
                      value={vendorName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="date-started"
                      className="col-form-label">
                      Date Started:
                      </label>
                    <DatePicker
                      className="form-control"
                      selected={startDate}
                      onChange={this.handleDateChange}
                      maxDate={moment()}
                      dateFormat="DD/MM/YYYY"
                      readOnly={true}
                      showDisabledMonthNavigation
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.addNewVendor}
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
    vendors: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(vendorActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddVendor);
