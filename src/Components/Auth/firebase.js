const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyCAbLn0Zris9TPCpmbX3SyRHYPTRTuUNTM",
  authDomain: "food-app-192210.firebaseapp.com",
  databaseURL: "https://food-app-192210.firebaseio.com",
  projectId: "food-app-192210",
  storageBucket: "",
  messagingSenderId: "183206900291"
};

firebase.initializeApp(config);

export default firebase;
