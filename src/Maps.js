import React, { Component } from 'react';
import {  Link } from 'react-router';
import firebase from "firebase";
import reactfire from "reactfire";
import $ from 'jquery';
var GoogleMapsLoader = require('google-maps'); 
GoogleMapsLoader.KEY = 'AIzaSyDgfBW1IQdr_PnN2UIx_5PgzGfJ_EzeA90';
 

var Maps = React.createClass({
  getInitialState: function(){
    return{
      maps:{},
      newMap:{
        lat:null,
        long:null
      } 
    }
  },

  render: function(){
      return (<div>
      <h1>Welcome, { this.props.currentUser.displayName }</h1>
      <p>Your new current lat is: { this.state.newMap.lat }</p>
      <p>Your new current long is: { this.state.newMap.long }</p>
      <button onClick={ this.addNewLocation }>Add Location</button>

      <div className='map' ref={this.showMarkers} />

      { Object.keys(this.state.maps).map((id) => {
                var component = this;

               var maps = this.state.maps[id];
               return <div key={ id } >
                 <p>old lat:{ maps.lat }</p>
                 <p> old long: {maps.long } </p>
                 <button onClick={ this.deleteMap.bind(component, id) }>Delete</button> 
               </div>
             })}
    </div>)
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
    },
  showMarkers: function(mapDiv){
    if (mapDiv) {
      this.mapDiv = mapDiv;
    }
    GoogleMapsLoader.load((google) => {
      if(!this.mapDiv || this.state.newMap.lat === null){
        return;
      }

       var locations = this.state.maps;

        var map = new google.maps.Map(this.mapDiv, {
                     zoom: 2,
                     center: {lat:this.state.newMap.lat, lng:this.state.newMap.long},
        });

        var marker, i;
        // console.log(this.state.maps);

        Object.keys(this.state.maps).map((id) => {
          console.log(id)
          var mapCoords = this.state.maps[id];
                  marker = new google.maps.Marker({
                                 position: new google.maps.LatLng(mapCoords.lat, mapCoords.long),
                                 map: map
                               });
               })

    });

  },
  componentDidMount:function() {
    this.firebaseRef = firebase.database().ref('users/'+this.props.currentUser.uid+ '/maps'); 
    this.firebaseRef.on("child_added", (dataSnapshot) => {
      var maps = this.state.maps;
      maps[dataSnapshot.key] = dataSnapshot.val();
      this.showMarkers();
      this.setState({
        maps: maps
      })
    })
    this.firebaseRef.on("child_removed", (dataSnapshot) =>{
      var maps = this.state.maps;
      delete maps[dataSnapshot.key];
      this.setState({ maps: maps })
    })
    $.ajax({
      url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDgfBW1IQdr_PnN2UIx_5PgzGfJ_EzeA90',
      method: 'POST',
      success: (data)=>{
        var lat = data.location.lat;
        var long = data.location.lng;
        this.setState({
          newMap:{
            lat: lat,
            long: long
          }
        })
      } //success
    }) //ajax
  }
})

export default Maps;