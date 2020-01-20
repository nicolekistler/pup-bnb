import React, { Component } from 'react';
import '../styles/RegistrationModal.css';

class RegistrationModal extends Component {
	constructor(props) {
		super(props);

		this.handleClose = this.handleClose.bind(this);
		this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
	}

	handleBackgroundClick(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		if (e.target == modal) {
			modal.style.display = 'none';
		}
	}

	handleClose(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		modal.style.display = 'none';
	}

	handleRegistration(e) {
		e.preventDefault();

		// Foo
	}

	render() {
		return (
			<div>
				<div id='registration-modal' onClick={this.handleBackgroundClick}>
				<div id='registration-modal-content'>
					<span className='close' onClick={this.handleClose}>&times;</span>
					<div id='registration-content'>

						<label>USERNAME</label><br/>
						<input className='registration-input' placeholder='Username' type='text'></input><br/><br/>

						<label>PASSWORD</label><br/>
						<input className='registration-input' placeholder='Password' type='password'></input><br/><br/>

						<label>RE-ENTER PASSWORD</label><br/>
						<input className='registration-input' placeholder='Password' type='password'></input><br/><br/>

						<button id='registration-button' onClick={this.handleRegistration}>
							<b>Sign Up</b>
						</button><br/><br/>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default RegistrationModal;
