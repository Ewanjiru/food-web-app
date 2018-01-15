import React from 'react';
import { Nav, NavItem, NavLink, } from 'reactstrap';

const Sidebar = () => (
  <div className="sidebar">
    <img src="" alt="pic" />
    <h5>DATA & ANALYTICS</h5>
    <Nav vertical>
      <NavItem>
        <i className="fa fa-signal" aria-hidden="true"></i>
        <NavLink href="#">Vendors</NavLink>
      </NavItem>
      <NavItem>
        <i className="fa fa-signal" aria-hidden="true"></i>
        <NavLink href="#">Meals</NavLink>
      </NavItem>
      <NavItem>
        <i className="fa fa-signal" aria-hidden="true"></i>
        <NavLink href="#">Menus</NavLink>
      </NavItem>
      <NavItem>
        <i className="fa fa-signal" aria-hidden="true"></i>
        <NavLink href="#">Reports</NavLink>
      </NavItem>
      <NavItem>
        <i className="fa fa-signal" aria-hidden="true"></i>
        <NavLink href="#">More</NavLink>
      </NavItem>
    </Nav>
  </div>
)

export default Sidebar;
