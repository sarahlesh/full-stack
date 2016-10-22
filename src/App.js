import React, { Component } from 'react';
import './App.css';
import Login from './login';
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
    console.log(this.state.loggedIn, this.state.currentUser)
    if (!this.state.loggedIn) {
        return <Login onLogin={ this.login } />
    }else {
      return (
      <div onLoad={this.createMap }>
        <h1>Welcome, { this.state.currentUser.displayName }</h1>
        <p>Your new current lat is: { this.state.newMap.lat }</p>
        <p>Your new current long is: { this.state.newMap.long }</p>
        <button onClick={ this.addNewLocation }>Add Location</button>

        { Object.keys(this.state.maps).map((id) => {
                  var component = this;
                 var maps = this.state.maps[id];
                 console.log(maps)
                 return <div key={ id } >
                   <p>old lat:{ maps.lat }</p>
                   <p> old long: {maps.long } </p>
                   <button onClick={ this.deleteMap.bind(component, id) }>Delete</button> 
                 </div>
               })}
      <Link to="/login" onClick={ this.signOut }>Sign Out</Link>
      </div>
      )
    }
  },
  login: function() {
    var user = firebase.auth().currentUser;
    console.log(user)
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
  addNewLocation: function(){
     var newMap = {
       lat: this.state.newMap.lat,
       long: this.state.newMap.long
     }
      this.firebaseRef.push(newMap);
  },

  addNewMap: function(){
    var myLatLng = {
      lat: this.state.newMap.lat, 
      lng: this.state.newMap.long
    };
    // $.ajax({
    //   url:'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgfBW1IQdr_PnN2UIx_5PgzGfJ_EzeA90&callback=initMap'
    // })
  },

  deleteMap: function(id){
      var component = this;
      console.log(this.firebaseRef.child(id))
      this.firebaseRef.child(id).remove();
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
    this.firebaseRef = firebase.database().ref('users/'+this.state.currentUser.uid+ '/maps'); 
    this.firebaseRef.on("child_added", (dataSnapshot) => {
      var maps = this.state.maps;
      maps[dataSnapshot.key] = dataSnapshot.val();
      component.setState({
        maps: maps
      })
    })
    this.firebaseRef.on("child_removed", (dataSnapshot) =>{
      console.log(dataSnapshot)
      var maps = this.state.maps;
      delete maps[dataSnapshot.key];
      this.setState({ maps: maps })
    })
    $.ajax({
      url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDgfBW1IQdr_PnN2UIx_5PgzGfJ_EzeA90',
      method: 'POST',
      success: function(data){
        var lat = data.location.lat;
        var long = data.location.lng;
        component.setState({
          newMap:{
            lat: lat,
            long: long
          }
        })
      }
    })
  },
})

// to the route add <MixpanelProvider mixpanel={mixpanel}> </MixpanelProvider>  ... check notes for intergration w mixpanel for usage tracking 




export default App;
