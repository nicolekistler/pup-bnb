import React, { Component } from 'react';
import '../styles/RegistrationModal.css';
import AuthService from './AuthService';

class RegistrationModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null
		};

		this.handleRegistrationClose   = this.handleRegistrationClose.bind(this);
		this.handleRegistrationBGClick = this.handleRegistrationBGClick.bind(this);
		this.triggerLoginModal         = this.triggerLoginModal.bind(this);
		this.handleChange              = this.handleChange.bind(this);
		this.handleRegistration        = this.handleRegistration.bind(this);

		this.Auth = new AuthService();

		this.loginModal        = null;
		this.registrationModal = null;
	}

	componentDidMount() {
		this.loginModal        = document.getElementById('login-modal');
		this.registrationModal = document.getElementById('registration-modal');
	}

	/* Handle when user clicks registration close */
	handleRegistrationClose(e) {
		e.preventDefault();

		this.registrationModal.style.display = 'none';
	}

	/* Handle when user clicks out of modal */
	handleRegistrationBGClick(e) {
		e.preventDefault();

		if (e.target === this.registrationModal) {
			this.registrationModal.style.display = 'none';
		}
	}

	/* Open login modal from registration */
	triggerLoginModal(e) {
		e.preventDefault();

		this.registrationModal.style.display = 'none';
		this.loginModal.style.display = 'block';
	}

	/* Handle input */
	handleChange(e){
		this.setState(
			{
				[e.target.name]: e.target.value
			}
		)
	}

	/* Handle when a user registers */
	handleRegistration(e){
		e.preventDefault();

		if(this.state.username && this.state.password) {
			const username = this.state.username;
			const password = this.state.password;

			const valid = this.validateInput(username, password);

			if(valid) {
				this.Auth.signup(this.state.username, this.state.password)
				.then(res => {
					alert('SUCCESS');
					// this.props.history.replace('/Login');
				})
				.catch(err => {
					this.usernameTaken();
				});
			}
		}
		// USERNAME RULES:
		// ALPHANUMERIC = alphanumeric characters only
		// 6-10 CHARACTERS = username too long, username too short
		// UNIQUE = username already taken

		// PASSWORD RULES:
		// ALPHANUMERIC = alphanumeric characters only
		// LONGER THAN 6-25 CHARACTERS = password too long, password too short

		// Passwords do not match
	}

	validateInput(username, password) {

	}

	usernameTaken() {

	}

	render() {
		return (
			<div>
				<div id='registration-modal' onClick={this.handleRegistrationBGClick}>
				<div id='registration-modal-content'>
					<span className='close' onClick={this.handleRegistrationClose}>&times;</span>
					<div id='registration-content'>

						<label>USERNAME</label><br/>
						<input
							className='registration-input'
							placeholder='Username'
							type='text'
							name='username'
							onChange={this.handleChange}
						/>

						<label>PASSWORD</label><br/>
						<input
							className='registration-input'
							placeholder='Password'
							type='password'
							name='password'
							onChange={this.handleChange}
						/>

						<label>RE-ENTER PASSWORD</label><br/>
						<input
							className='registration-input'
							placeholder='Password'
							type='password'
						/>

						<button id='registration-button' onClick={this.handleRegistration}>
							<b>Sign Up</b>
						</button>
						<div id='login'>
							Already have a Pupbnb account? <a href='' onClick={this.triggerLoginModal}>Login</a>
						</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default RegistrationModal;
