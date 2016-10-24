import React, { Component } from 'react';
import firebase from "firebase";
import reactfire from "reactfire";
import $ from 'jquery';

var UpdateProfile = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			password: '',
		  	name: '',
		  	photoURL: ''
		} 
	},

	render: function(){
		return (
			<div className="user-info">
				<h2>Update your profile</h2>
				<label htmlFor="update-name">Display Name</label>
				<input type="text" id="update-name" placeholder="Name" value={ this.state.name } onChange={ this.resetName } value={this.state.currentUser.displayName}/>
			</div>
			)
	},
	resetName: function(e){
		this.setState({
			name: e.target.value
		})
	},
	updateProfile: function(){
		 var user = firebase.auth().currentUser;
		return user.updateProfile({
		                 displayName: name
		             })
	}

})

export default UpdateProfile;