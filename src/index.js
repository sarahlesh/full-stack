import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from "firebase";

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyALCGlPY1azhOJgYe2emOGlcpiVQOc_Fds",
    authDomain: "sailor-hop.firebaseapp.com",
    databaseURL: "https://sailor-hop.firebaseio.com",
    storageBucket: "sailor-hop.appspot.com",
    messagingSenderId: "220188217648"
  };
  firebase.initializeApp(config);