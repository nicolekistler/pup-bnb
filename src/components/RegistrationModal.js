import React, { Component } from 'react';
import '../styles/RegistrationModal.css';

class RegistrationModal extends Component {
	constructor(props) {
		super(props);

		this.handleRegistrationClose   = this.handleRegistrationClose.bind(this);
		this.handleRegistrationBGClick = this.handleRegistrationBGClick.bind(this);
		this.triggerLogin              = this.triggerLogin.bind(this);
	}

	handleRegistrationClose(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		modal.style.display = 'none';
	}

	handleRegistrationBGClick(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		if (e.target == modal) {
			modal.style.display = 'none';
		}
	}

	triggerLogin(e) {
		e.preventDefault();

		let modal = document.getElementById('registration-modal');

		modal.style.display = 'none';

		modal = document.getElementById('login-modal');

		modal.style.display = 'block';
	}

	handleRegistration(e) {
		e.preventDefault();

		// Foo
	}

	render() {
		return (
			<div>
				<div id='registration-modal' onClick={this.handleRegistrationBGClick}>
				<div id='registration-modal-content'>
					<span className='close' onClick={this.handleRegistrationClose}>&times;</span>
					<div id='registration-content'>

						<label>USERNAME</label><br/>
						<input className='registration-input' placeholder='Username' type='text'></input><br/><br/>

						<label>PASSWORD</label><br/>
						<input className='registration-input' placeholder='Password' type='password'></input><br/><br/>

						<label>RE-ENTER PASSWORD</label><br/>
						<input className='registration-input' placeholder='Password' type='password'></input><br/><br/>

						<button id='registration-button' onClick={this.handleRegistration}>
							<b>Sign Up</b>
						</button>
						<div id='login'>
							Already have a Pupbnb account? <a onClick={this.triggerLogin}>Login!</a>
						</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default RegistrationModal;
