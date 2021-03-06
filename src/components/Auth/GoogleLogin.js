import firebase from './firebase.js';
import { connect } from 'react-redux';
import React from 'react';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import decodeToken from './decodeToken';
import * as loginActions from '../../actions/login'
import { hashHistory } from 'react-router';
import { error } from 'util';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      const andelaEmailRegex = /@andela.com$/
      if (!andelaEmailRegex.test(user.email.toString())) {
        this.props.history.push("/");
        return toastr.error('nop!')
      }
      console.log('user2', user);
      this.props.actions.userLogin(user) &&
      this.props.history.push("/user");

    });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    this.props.actions.performLogin();

  }
  validateUser() {
    const userDetails = decodeToken()
    console.log('userdet', userDetails)
  }

  render() {
    return (

      <div>
        <button className="sign-in-with-google" onClick={this.login}>Sign In With Google</button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log('login her', state.LoginReducer)
  return (
    state.LoginReducer
  )
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(loginActions, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
