import firebase from './firebase.js';
import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import decodeToken from './decodeToken';
import loginActions from '../../actions/login'
import { hashHistory } from 'react-router';

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
      if (user) {
        this.setState({ user });
      }
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

    // auth.signInWithRedirect(provider)
    //   .then((result) => {
    //     const user = result.user;
    //     this.setState({
    //       user
    //     });
    //   });
    //   this.state.user &&
    //   hashHistory.push('/user');
      
  }
  validateUser (){
    const userDetails = decodeToken()
    console.log('userdet', userDetails)
  }

  render() {
    console.log('user', this.state.user)
    return (
  
        <div>
            <button className="sign-in-with-google" onClick={this.validateUser}>Sign In With Google</button>
        </div>
    )
  }
}
const mapStateToProps = login => ({
  login
})



export default Login;
