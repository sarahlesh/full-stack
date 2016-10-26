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

      <div className='map' ref={(div) => this.mapDiv = div } />

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
  componentDidMount:function() {
    this.firebaseRef = firebase.database().ref('users/'+this.props.currentUser.uid+ '/maps'); 
    this.firebaseRef.on("child_added", (dataSnapshot) => {
      var maps = this.state.maps;
      maps[dataSnapshot.key] = dataSnapshot.val();
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

        GoogleMapsLoader.load((google) => {

           var map = new google.maps.Map(this.mapDiv, {
                         zoom: 15,
                         center: {lat:this.state.newMap.lat, lng:this.state.newMap.long}
            });

            new google.maps.Marker({
                         position: {lat:this.state.newMap.lat, lng:this.state.newMap.long},
                         map: map,
            });

           // not sure if loading markers 

            // var locations = [
            //   ['Bondi Beach', -33.890542, 151.274856, 4],
            //   ['Coogee Beach', -33.923036, 151.259052, 5],
            //   ['Cronulla Beach', -34.028249, 151.157507, 3],
            //   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
            //   ['Maroubra Beach', -33.950198, 151.259302, 1]
            // ];

            // var map = new google.maps.Map(this.mapDiv, {
            //              zoom: 15,
            //              center: {lat:-33.92, lng:151.25},
            // });

            // var marker, i;

            // for (i = 0; i < locations.length; i++) { 
            //   console.log(locations[i][1], locations[i][2])
            //   marker = new google.maps.Marker({
            //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            //     map: map
            //   });
            // }

        });
      } //success
    }) //ajax
  }
})

export default Maps;