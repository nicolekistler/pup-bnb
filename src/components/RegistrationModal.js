import React, { Component } from 'react';
import '../styles/RegistrationModal.css';

class RegistrationModal extends Component {
	constructor(props) {
		super(props);

		this.hideRegistrationModal = this.hideRegistrationModal.bind(this);
	}

	hideRegistrationModal(e) {
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
				<div id='registration-modal'>
				<div id='registration-modal-content'>
					<span className='close' onClick={this.hideRegistrationModal}>&times;</span>
					<div id='registration-content'>

						<label>USERNAME</label><br/>
						<input className='registration-input' placeholder='Username' type='text'></input><br/><br/>

						<label>FIRST NAME</label><br/>
						<input className='registration-input' placeholder='First Name' type='text'></input><br/><br/>

						<label>LAST NAME</label><br/>
						<input className='registration-input' placeholder='Last Name' type='text'></input><br/><br/>

						<label>PASSWORD</label><br/>
						<input className='registration-input' placeholder='Create a Password' type='password'></input><br/><br/>

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
