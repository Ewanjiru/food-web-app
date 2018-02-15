import firebase from './firebase.js';
import "../../styles/Login.css";
const React = require('react');

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
    auth.signInWithRedirect(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  render() {
    return (
      <header>
        <div className="login">
          {this.state.user ?
            <div className='login'>
              <img className="image" style={{ backgroundColor: 'white', width: '2.5rem', height: '2.5rem', borderRadius: '50%', margin: '.5rem', textAlign: 'right' }} src={this.state.user.photoURL} />

              <button onClick={this.logout}>Log Out</button>
            </div>
            :
            <button onClick={this.login}>Log In</button>
          }
        </div>
      </header>
    )
  }
}

export default Login;
