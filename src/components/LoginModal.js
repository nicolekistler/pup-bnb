import React, { Component } from 'react';
import '../styles/LoginModal.css';

class LoginModal extends Component {
	constructor(props) {
		super(props);

		this.hideLoginModal = this.hideLoginModal.bind(this);
	}

	hideLoginModal(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		modal.style.display = 'none';
	}

	handleLogin(e) {
		e.preventDefault();

		// Foo
	}

	render() {
		return (
			<div>
				<div id='login-modal'>
				<div id='login-modal-content'>
					<span className='close' onClick={this.hideLoginModal}>&times;</span>
					<div id='login-content'>
						<label>USERNAME</label><br/>
						<input className='login-input' placeholder='Username' type='text'></input><br/><br/>
						<label>PASSWORD</label><br/>
						<input className='login-input' placeholder='Password' type='password'></input><br/><br/>
						<button id='login-button' onClick={this.handleLogin}>
							<b>Log in</b>
						</button><br/><br/>
						Don't have an account? Sign Up
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default LoginModal;
