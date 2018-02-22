import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddVendor from './addVendors.js';
import DeleteVendor from './deleteVendors.js';
import EditVendor from './editVendors.js';
import Sidebar from '../sidebar.js';
import * as vendorActions from '../../actions/actions.js';

class Vendors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: {},
      addVendor: '',
      modalOpen: '',
      selectedVendor: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadAllVendors();
  }

  componentWillReceiveProps(nextProps) {
    const { vendors } = nextProps;
    this.setState({
      vendors: Object.assign({}, this.state.vendors, vendors)
    })
  }

  handleChange(event, vendor) {
    event.preventDefault();
    const { name } = event.target;
    this.setState({
      modalOpen: name,
      selectedVendor: vendor
    })
  }

  closeModal() {
    this.setState({
      modalOpen: '',
    })
  }

  render() {
    const { vendors } = this.state;
    const vendorsObj = vendors.VendorsReducer
    let vendorsArray = [];
    for (let key in vendorsObj) {
      if (vendorsObj.hasOwnProperty(key)) {
        vendorsArray.push({
          key: key,
          value: vendorsObj[key]
        });
      }
    }

    return (
      <div className="content-wrapper">
        <Sidebar />
        <div className="content">
          <div className="vendors">
            <div className="header">
              <h4>Vendors</h4>
              <button
                id="icons"
                className="fa fa-plus-circle"
                aria-hidden="true"
                name="add"
                onClick={(event) => this.handleChange(event, null)}
              />
            </div>
            <div className="vendors-content">
              {
                (vendorsArray.length !== 0) ?
                  vendorsArray.map(vendor => (
                    <div className="card" key={vendor.key}>
                      <div className="card-body">
                        <p className="card-text">Name: {vendor.value.vendorName} </p>
                        <p className="card-text">Date: {vendor.value.date_created} </p>
                      </div>
                      <div className="card-footer">
                        <button
                          id="icons"
                          className="fa fa-trash"
                          aria-hidden="true"
                          name="delete"
                          onClick={(event) => this.handleChange(event, vendor)} />
                        <button
                          id="icons"
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                          name="edit"
                          onClick={(event) => this.handleChange(event, vendor)} />
                      </div>
                    </div>
                  ))
                  : ''
              }
            </div>
            <AddVendor
              open={this.state.modalOpen}
              close={this.closeModal}
            />
            <EditVendor
              selectedVendor={this.state.selectedVendor}
              open={this.state.modalOpen}
              close={this.closeModal}
            />
            <DeleteVendor
              selectedVendor={this.state.selectedVendor}
              open={this.state.modalOpen}
              close={this.closeModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    vendors: state,
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(vendorActions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
