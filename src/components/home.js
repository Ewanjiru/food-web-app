import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,
  Button, CardHeader, CardFooter, Nav, NavItem, NavLink,
  Collapse, Navbar, NavbarToggler, NavbarBrand, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem,
  InputGroup, Input,
} from 'reactstrap';
import Sidebar from './sidebar';
import Vendors from './vendors';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-wrapper">
        <Sidebar />
        <div className="content">
          <div className="header">
            <Navbar color="faded" light expand="md">
              <div className="profile">
                <img class="profile-picture" src="../images/pic.jpg" alt="profile" />
              </div>
              <InputGroup>
                <Input placeholder="Search ..." />
              </InputGroup>
            </Navbar>
          </div>
          <div className="toggle-options">
            <Vendors />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
