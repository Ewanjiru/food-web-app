import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from '../../actions/actions.js';

class EditVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: '',
      vendorName: '',
      vendorKey: '',
      date_created: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editVendor = this.editVendor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open, selectedVendor } = nextProps;
    if (open === 'edit') {
      const { value, key } = selectedVendor
      this.setState({
        modalOpen: open,
        vendorKey: key,
        vendorName: value.vendorName,
        date_created: value.date_created
      })
    } else
      this.setState({
        modalOpen: ""
      })
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { vendorName, date_created } = this.state;
    this.setState({
      [name]: value
    });
  }

  editVendor() {
    const { vendorKey, vendorName, date_created } = this.state;
    this.props.actions.editVendor(vendorKey, { vendorName, date_created });
    this.props.close();
  }

  render() {
    const { modalOpen, vendorName, date_created } = this.state;
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
                <h5 className="modal-title" id="exampleModalLongTitle">EDIT VENDOR</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.props.close()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="vendor-name" className="col-form-label">Vendor Name:</label>
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
                    <label htmlFor="date-started" className="col-form-label">Date Started:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      name="date_created"
                      value={date_created}
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
                  onClick={this.editVendor}
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
    vendors: state
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(vendorActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditVendor);

