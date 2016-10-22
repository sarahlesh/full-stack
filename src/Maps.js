import React, { Component } from 'react';
import {  Link } from 'react-router';
import firebase from "firebase";
import reactfire from "reactfire";


var Maps = React.createClass({
  getInitialState: function(){
    return{
      maps:{},
      newMap:{
        lat:"",
        long:""
      } 
    }
  },

  render: function(){
      return (<div>
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
    </div>)
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
  },
  deleteMap: function(id){
      var component = this;
      console.log(this.firebaseRef.child(id))
      this.firebaseRef.child(id).remove();
    }
})

export default Maps;