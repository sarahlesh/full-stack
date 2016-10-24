import React from 'react';
import firebase from 'firebase';
import { browserHistory} from 'react-router';

var Login = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			password: '',
		 	mode: 'login',
		 	error: null,
		 	name: ''
		} 
	},

	render: function(){
		return(
			<div className="login" id="login">
				<p>{this.state.error}</p>
				<label htmlFor="login">Login
				  <input type='radio' id="login" name="login-signup" value='login' checked={ this.state.mode == 'login' } onChange={ this.setMode } />
				 </label>

				<label htmlFor="signup"> Signup	
				  <input type='radio' id="signup" name="login-signup" value='signup' checked={ this.state.mode == 'signup' } onChange={ this.setMode } />
				  </label>
				{this.state.mode == "signup" ? <div><input type='text' className="login-input" placeholder="name" value={ this.state.name } onChange={ this.setName }/></div>: null}

				<div>
			  <input type='text' className="login-input" placeholder="email" value={ this.state.email } onChange={ this.setEmail }/>
			  </div>

			  <div>
			  <input type="password" className="login-input" placeholder="password" value={ this.state.password } onChange={ this.setPassword }/>
			  </div>

			    <button className="button" onClick={ this.login } >{this.state.mode }</button>

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

		    	 browserHistory.push("/");

		    })
		    .catch(function(data){
		      component.setState({
		        error: data.message
		      })
		    })
		  }
		  if(this.state.mode === "login"){
		   firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		   .then(function(data){

		   	browserHistory.push("/");

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