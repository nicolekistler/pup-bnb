import React, { Component } from 'react';
import '../styles/LoginModal.css';

class LoginModal extends Component {
	constructor(props) {
		super(props);

		this.handleClose = this.handleClose.bind(this);
		this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
	}

	handleBackgroundClick(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		if (e.target == modal) {
			modal.style.display = 'none';
		}
	}

	handleClose(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		modal.style.display = 'none';
	}

	handleLogin(e) {
		e.preventDefault();

		// Foo
	}

	triggerRegistration(e) {
		e.preventDefault();

		let modal = document.getElementById('login-modal');

		modal.style.display = 'none';

		modal = document.getElementById('registration-modal');

		modal.style.display = 'block';
	}

	render() {
		return (
			<div>
				<div id='login-modal' onClick={this.handleBackgroundClick}>
					<div id='login-modal-content'>
						<span className='close' onClick={this.handleClose}>&times;</span>
						<div id='login-content'>
							<label>USERNAME</label><br/>
							<input className='login-input' placeholder='Username' type='text'></input><br/><br/>
							<label>PASSWORD</label><br/>
							<input className='login-input' placeholder='Password' type='password'></input><br/><br/>
							<button id='login-button' onClick={this.handleLogin}>
								<b>Log in</b>
							</button><br/><br/>
							<div id='sign-up'>
								Don't have an account? <a onClick={this.triggerRegistration}>Sign up!</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginModal;
