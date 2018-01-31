const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyAQLokf93e22QxApccpZfvRqRlPyrKM2Mg",
  authDomain: "meal-attendance-app.firebaseapp.com",
  databaseURL: "https://meal-attendance-app.firebaseio.com",
  projectId: "meal-attendance-app",
  storageBucket: "meal-attendance-app.appspot.com",
  messagingSenderId: "95847112468"
};
// if (!firebase.apps.length) {
//   firebase.initializeApp({});
// }

firebase.initializeApp(config);

export default firebase;
