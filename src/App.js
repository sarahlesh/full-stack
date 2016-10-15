import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login';
import $ from 'jquery';
import firebase from "firebase";
import reactfire from "reactfire";


var App = React.createClass({
  getInitialState: function(){
    return {
      currentUser: '',
      loggedIn: true,
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
      <div onLoad={this.createMap }>
        <h1>Welcome, { this.state.currentUser }</h1>
        <p>Your new current lat is: { this.state.newMap.lat }</p>
        <p>Your new current long is: { this.state.newMap.long }</p>

        { Object.keys(this.state.maps).map((id) => {
                  var component = this;
                 var maps = this.state.maps[id];
                 return <div key={ id } >
                   <p>old lat:{ maps.lat }</p>
                   <p> old long: {maps.long } </p>
                   
                 </div>
               })}



      </div>
      )
    }
  },
  login: function() {
    var user = firebase.auth().currentUser;
    this.setState({ 
      loggedIn: true,
      currentUser: user.displayName
    });
  },
  addNewMap: function(){
    this.firebaseRef = firebase.database().ref("maps");
    console.log(this.firebaseRef);
    // this.firebaseRef.on("child_added", (dataSnapshot) => {
    //   var messages = this.state.messages;
    //   messages[dataSnapshot.key] = dataSnapshot.val();
    //   this.setState({
    //     messages: messages
    //   })
  },
  componentDidMount: function(){
    var component = this;
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
        this.firebaseRef = firebase.database().ref('map');
        console.log(this.firebaseRef);
        this.firebaseRef.on("child_added", (dataSnapshot) => {
          var maps = this.state.maps;
          console.log(maps, dataSnapshot);
          maps[dataSnapshot.key] = dataSnapshot.val();
          this.setState({
            maps: maps
          })
        })
      }
    })
  },
})



export default App;
