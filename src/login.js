import React from 'react';
import firebase from 'firebase';

var Login = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			password: '',
		  mode: 'signup',
		  error: null,
		  name: ''
		} 
	},

	render: function(){
		return(
			<div>
				<p>{this.state.error}</p>
				<label htmlFor="login">
				  <input type='radio' id="login" value='login' checked={ this.state.mode == 'login' } onChange={ this.setMode } />
				  Login
				</label>

				<label htmlFor="signup">
				  <input type='radio' value='signup' checked={ this.state.mode == 'signup' } onChange={ this.setMode } />
				  Signup
				</label>

				{this.state.mode == "signup" ? <input type='text' placeholder="name" value={ this.state.name } onChange={ this.setName }/>: null}
			  <input type='text' placeholder="email" value={ this.state.email } onChange={ this.setEmail }/>

			  <input type="password" placeholder="password" value={ this.state.password } onChange={ this.setPassword }/>

			    <button onClick={ this.login } >{this.state.mode }</button>

			</div>
			)
	},
	setName: function(e){
		this.setState({
			name: e.target.value
		})
	},
	setMode: function(e) { 
		this.setState({ 
			mode: e.target.value 
		}); 
	},
	setEmail: function(e) { 
		this.setState({ 
			email: e.target.value 
		}); 
	},

	setPassword: function(e) { this.setState({ 
			password: e.target.value 
		}); 
	},

	login: function(){
		  var component = this;
		  if(this.state.mode === "signup"){
		    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
		    .then(function(data){
		      var user = firebase.auth().currentUser;
		      return user.updateProfile({
		      		             displayName: component.state.name
		      		         })
		    })
		    .then(function(data){
		    	component.props.onLogin();
		    })
		    .catch(function(data){
		      component.setState({
		        error: data.message
		      })
		    })
		  }
		  if(this.state.mode === "login"){
		   firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		   .then(function() {
		           var user = firebase.auth().currentUser;
		           user.updateProfile({
		             displayName: component.state.name
		           })
		         })
		   .then(function(data){
		   	component.props.onLogin();
		   })
		   .catch(function(data){
		      component.setState({
		        error: data.message
		      })
		   })
		}
	}
})

export default Login;