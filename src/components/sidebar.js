import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {

  }

  render() {
    return (
      <div className="sidebar">
        <div className="profile">
          <img src="../../images/pic.jpg" alt="pic" />
          &nbsp;
          <h5>Eunice Wanjiru</h5>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item" name="vendors">
            <Link to="/" className="fa fa-signal" aria-hidden="true">
              &nbsp;  Vendors
            </Link>
          </li>
          <li className="nav-item" name="menu">
            <Link to="/menus" className="fa fa-cutlery" aria-hidden="true" >
              &nbsp;  Menu
            </Link>
          </li>
          <li className="nav-item" name="reports">
            <Link to="/reports" className="fa fa-pie-chart" aria-hidden="true">
              &nbsp; Reports
          </Link>
          </li>
        </ul>
        <div className="logout">
          <ul className="nav flex-column">
            <li className="nav-item" name="vendors">
              <Link to="/" className="	fa fa-arrow-left" aria-hidden="true" onClick={this.logout}>
                &nbsp;  Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar;
