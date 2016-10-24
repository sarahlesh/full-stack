import React, { Component } from 'react';
import firebase from "firebase";
import reactfire from "reactfire";
import $ from 'jquery';
import { Link } from 'react-router';

var UpdateProfile = React.createClass({
	getInitialState: function(){
		return {
			email: this.props.currentUser.email || '',
			password: '',
		  	name: this.props.currentUser.displayName || '',
		  	photoURL: this.props.currentUser.photoURL || ''
		} 
	},

	render: function(){
		return (
			<div className="user-info">
				<h2>Update your profile</h2>
				<label htmlFor="update-name">Display Name</label>
				<input type="text" id="update-name" placeholder="Name" value={ this.state.name } onChange={ this.resetName } value={this.state.name}/>

				<label htmlFor="updateEmail">Email</label>
				<input type="email" id="update-email" placeholder="Email" value={ this.state.email } onChange={ this.resetEmail } value={this.state.email}/>

				<label htmlFor="update-photo">URL to Photo</label>
				<input type="text" name="update-photo" id="update-photo" value={ this.state.photoURL } onChange={ this.resetPhoto } />
				
				<button onClick={ this.updateProfile }>Update</button>

			</div>
			)
	},
	resetName: function(e){
		this.setState({
			name: e.target.value
		})
	},
	resetEmail: function(e){
		this.setState({
			email: e.target.value
		})
	},
	resetPhoto: function(e){
		this.setState({
			photoURL: e.target.value
		})
	},
	updateProfile: function(){
		 var user = firebase.auth().currentUser;
		return user.updateProfile({
		                 displayName: this.state.name,
		                 email: this.state.email,
		                 photoURL: this.state.photoURL
		             })
	}

})

export default UpdateProfile;