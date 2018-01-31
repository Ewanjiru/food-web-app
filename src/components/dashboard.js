import React, { Component } from 'react';
import styles from '../styles/styles.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
      <div className="frame row">
          <div className="dasboard-left col-6">
            <div className="logo">
              Chakula
            </div>
            <div className="provide-feedback-section">
            Provide feedback for a more delightful <br/>
            food experience!
            </div>
            <button className="sign-in-with-google">Sign In With Google</button>
          </div>
          <div className="dashboard-right col-6">
              <img className="img-fluid" src= {require('../images/iphone.png')}/>
          </div>
          </div>
      </div>
    );
  }
}

export default Dashboard;

