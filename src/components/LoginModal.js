import React, { Component } from 'react';
import '../styles/LoginModal.css';
import AuthService from './AuthService';
import { withRouter } from 'react-router';

class LoginModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null
		};

		this.Auth = new AuthService();

		this.handleLoginClose    = this.handleLoginClose.bind(this);
		this.handleLoginBGClick  = this.handleLoginBGClick.bind(this);
		this.triggerRegistration = this.triggerRegistration.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin  = this.handleLogin.bind(this);

		this.displayInvalid = this.displayInvalid.bind(this);

		this.invalidError      = null;
		this.loginModal        = null;
		this.registrationModal = null;
	}

	componentDidMount() {
		this.invalidError      = document.getElementById('invalid-login');
		this.loginModal        = document.getElementById('login-modal');
		this.registrationModal = document.getElementById('registration-modal');
	}

	/* Handle user clicking outside of modal */
	handleLoginBGClick(e) {
		e.preventDefault();

		if (e.target === this.loginModal) {
			this.loginModal.style.display = 'none';
		}
	}

	/* Handle user closing login modal */
	handleLoginClose(e) {
		e.preventDefault();

		this.loginModal.style.display = 'none';

		this.invalidError.style.display = 'none';
	}

	/* Trigger registration modal from login modal */
	triggerRegistration(e) {
		e.preventDefault();

		this.loginModal.style.display = 'none';

		this.registrationModal.style.display = 'block';
	}

	/* Handle change in login input */
	handleChange(e){
		this.setState(
			{
				[e.target.name]: e.target.value
			}
		)

		this.invalidError.style.display = 'none';
	}

	/* Handle when user logs in */
	handleLogin(e){
		e.preventDefault();

		if(this.state.username && this.state.password) {
			this.Auth.login(this.state.username, this.state.password)
				.then(res => {
					this.handleLoginClose(e);

					this.props.history.push('/MyBookings');
				})
				.catch(err => {
					this.displayInvalid();
				});
		}
	}

	/* Handle incorrect credentials */
	displayInvalid() {
		this.invalidError.style.display = 'block';
	}

	render() {
		return (
			<div>
				<div id='login-modal' onClick={this.handleLoginBGClick}>
					<div id='login-modal-content'>
						<span className='close' onClick={this.handleLoginClose}>&times;</span>
						<div id='login-content'>
							<label>USERNAME</label>
							<input
								className='login-input'
								placeholder='Username'
								type='text'
								name='username'
								onChange={this.handleChange}
							/>

							<label>PASSWORD</label>
							<input
								className='login-input'
								placeholder='Password'
								type='password'
								name='password'
								onChange={this.handleChange}
							/>
							<input
								id="form-submit"
								value="Log In"
								type="submit"
								onClick={this.handleLogin}
							/>
							<div id='invalid-login'>
								The provided login credentials are incorrect, please try again 🐶
							</div>
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

export default withRouter(LoginModal);
