import React, { Component } from 'react';
import '../styles/RegistrationModal.css';
import AuthService from './AuthService';

class RegistrationModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null,
			reentered: null,
			errorMessage: null
		};

		this.Auth = new AuthService();

		this.handleRegistrationClose = this.handleRegistrationClose.bind(this);
		this.handleRegistrationBGClick = this.handleRegistrationBGClick.bind(this);
		this.triggerLoginModal = this.triggerLoginModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRegistration = this.handleRegistration.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);

		this.loginModal = null;
		this.registrationModal = null;
		this.invalidError = null;
	}

	componentDidMount() {
		this.loginModal = document.getElementById('login-modal');
		this.registrationModal = document.getElementById('registration-modal');
		this.invalidError = document.getElementById('invalid-registration');
	}

	/* Handle when user clicks registration close */
	handleRegistrationClose(e) {
		e.preventDefault();

		this.registrationModal.style.display = 'none';
		
		this.invalidError.classList.remove('open');
	}

	/* Handle when user clicks out of modal */
	handleRegistrationBGClick(e) {
		e.preventDefault();

		if (e.target === this.registrationModal) {
			this.registrationModal.style.display = 'none';
			
			this.invalidError.classList.remove('open');
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
		
		this.invalidError.classList.remove('open');
	}

	/* Handle when a user registers */
	handleRegistration(e){
		e.preventDefault();

		const valid = this.validateInput();

		if(valid !== true) {
			return;
		}

		this.Auth.signup(this.state.username, this.state.password)
			.then(res => {
				this.triggerLoginModal(e);
			})
			.catch(err => {
				this.usernameTaken();
			});
	}

	/* Handle enter key */
	handleKeyDown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();

			this.handleRegistration(e);
		}
	}

	validateInput() {
		const username = this.state.username;
		const password = this.state.password;
		const reentered = this.state.reentered;

		if(!username || !password || !reentered) {
			this.displayError('Please complete all registration fields');

			return false;
		}

		if(username.length < 6 || username.length > 15) {
			this.displayError('Username must be 6-15 characters');
			
			return false;
		}

		if(username.match(/\W/)) {
			this.displayError('Username must consist of alphanumeric characters');
			
			return false;
		}

		if(password.length < 6 || password.length > 15) {
			this.displayError('Password must be 6-15 characters');
			
			return false;
		}

		if(username.match(/\W/)) {
			this.displayError('Password can only consist of alphanumeric characters');
			
			return false;
		}

		if(password !== reentered) {
			this.displayError('Passwords do not match');

			return false;

		}

		return true;
	}

	displayError(errorMessage = 'An error has occurred') {
		this.setState({
			errorMessage: errorMessage
		});

		this.invalidError.classList.add('open');

		return;
	}

	usernameTaken() {
		this.displayError('Username already taken');
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
							id='registration-username'
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
						/>

						<label>PASSWORD</label><br/>
						<input
							className='registration-input'
							placeholder='Password'
							type='password'
							name='password'
							id='registration-password'
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
						/>

						<label>RE-ENTER PASSWORD</label><br/>
						<input
							className='registration-input'
							placeholder='Re-Enter Password'
							type='password'
							name='reentered'
							id='registration-reentered'
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
						/>

						<button id='registration-button' onClick={this.handleRegistration}>
							<b>Sign Up</b>
						</button>
						<div id='invalid-registration'>
							{this.state.errorMessage} 🐶
						</div>
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
