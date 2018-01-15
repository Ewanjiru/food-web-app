import React from 'react';
import { Navbar, Table } from 'reactstrap';

const Vendors = () => (
  <div className="vendors">
    <div className="vendors-header">
      <Navbar color="faded" light expand="md">
        <h6>Vendors</h6>
        <i className="fa fa-signal" aria-hidden="true"></i>
      </Navbar>
    </div>
    <div className="vendors-content">
      <Table striped>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Date Hired</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="first-column">Drop Technologies Inc</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td id="first-column">Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td id="first-column">Larry</td>
            <td>the Bird</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
)

export default Vendors;
