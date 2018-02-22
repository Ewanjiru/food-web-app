import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as authActions from '../actions/login.js';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    const userObject = Object.assign({}, user);
    if (Object.keys(userObject).length === 0) {
      this.props.history.push("/");
    }
  }

  logout() {
    this.props.actions.performLogout();
  }

  render() {
    const userObject = Object.assign({}, this.props.user);
    return (
      <div className="sidebar">
        <div className="profile">
          <img src={userObject.photoURL} alt="pic" />
          &nbsp;
          <h5>{userObject.displayName}</h5>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item" name="vendors">
            <Link to="/vendors">
              <span className="fa fa-birthday-cake" aria-hidden="true" />
              &nbsp;  Vendors
              <span className="fa fa-caret-right" aria-hidden="true" />
            </Link>
          </li>
          <li className="nav-item" name="menu">
            <Link to="/menus">
              <span className="fa fa-cutlery" aria-hidden="true" />
              &nbsp;  Menu
              <span className="fa fa-caret-right" aria-hidden="true" />
            </Link>
          </li>
          <li className="nav-item" name="reports">
            <Link to="/reports">
              <span className="fa fa-pie-chart" aria-hidden="true" />
              &nbsp; Reports
              <span className="fa fa-caret-right" aria-hidden="true" />
            </Link>
          </li>
        </ul>
        <div className="logout">
          <ul className="nav flex-column">
            <li className="nav-item" name="vendors" id="logout" onClick={this.logout}>
              <span className="fa fa-arrow-left" aria-hidden="true" />
              &nbsp;  Sign Out
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    user: state.LoginReducer,
  }
)

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(authActions, dispatch)
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
