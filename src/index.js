
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './login';
import Maps from './Maps';
import UpdateProfile from './UpdateProfile';
import './index.css';
import firebase from "firebase";
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyALCGlPY1azhOJgYe2emOGlcpiVQOc_Fds",
  authDomain: "sailor-hop.firebaseapp.com",
  databaseURL: "https://sailor-hop.firebaseio.com",
  storageBucket: "sailor-hop.appspot.com",
  messagingSenderId: "220188217648"
};
firebase.initializeApp(config);


ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/login"  component={ Login }/>
      <Route path="/" component={App}>
        <IndexRoute component={Maps} />
        <Route path="profile" component={ UpdateProfile } />
      </Route>
  </Router>,
  document.getElementById('root')
);