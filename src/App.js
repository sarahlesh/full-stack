import React, { Component } from 'react';
import './App.css';
import Login from './login';
import Maps from './Maps';
import UpdateProfile from './UpdateProfile';
import {  Link } from 'react-router';
import $ from 'jquery';
import firebase from "firebase";
import reactfire from "reactfire";
import mixpanel from 'mixpanel-browser';

var App = React.createClass({ 
  getInitialState: function(){
    return {
      currentUser: {},
      loggedIn: false,
      maps:{},
      newMap:{
        lat:"",
        long:""
      } 
    }
  },
  render: function() {
    if (!this.state.loggedIn) {
        return <Login onLogin={ this.login } />
    }else {
      return (
      <div >
      <Link to="/">My Maps</Link>
      <Link to="profile">My Profile</Link>
      <Link onClick={ this.signOut }>Sign Out</Link>

      <div className="logginInUser">
      <p>Hi, { this.state.currentUser.displayName }</p>
      {this.state.currentUser.photoURL == null ? <img src="http://www.shockmansion.com/wp-content/myimages/2016/03/rr231.jpg" alt=""/> : <img src={ this.state.currentUser.photoURL } alt=""/> }
      
      </div>
      {React.cloneElement(this.props.children, {currentUser:this.state.currentUser })}
      
      </div>
      )
    }
  },
  login: function() {
    var user = firebase.auth().currentUser;
    this.setState({ 
      loggedIn: true,
      currentUser: user
    });
  },
  signOut: function(){
    var component = this;
    firebase.auth().signOut().then(function() {
      console.log("sign out")
      component.setState({ 
            loggedIn: false
          });
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  },
  componentDidMount: function(){
    var component = this;
    firebase.auth().onAuthStateChanged(function(user){
      var user = firebase.auth().currentUser;
      if(user){
        component.setState({
          loggedIn: true,
          currentUser: user
        })
      }
    })
  },
})

// to the route add <MixpanelProvider mixpanel={mixpanel}> </MixpanelProvider>  ... check notes for intergration w mixpanel for usage tracking 




export default App;