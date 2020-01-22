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

		this.handleLoginClose    = this.handleLoginClose.bind(this);
		this.handleLoginBGClick  = this.handleLoginBGClick.bind(this);
		this.triggerRegistration = this.triggerRegistration.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin  = this.handleLogin.bind(this);

		this.Auth = new AuthService();
	}

	/* Handle user clicking outside of modal */
	handleLoginBGClick(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		if (e.target === modal) {
			modal.style.display = 'none';
		}
	}

	/* Handle user closing login modal */
	handleLoginClose(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		modal.style.display = 'none';
	}

	/* Trigger registration modal from login modal */
	triggerRegistration(e) {
		e.preventDefault();

		let modal = document.getElementById('login-modal');

		modal.style.display = 'none';

		modal = document.getElementById('registration-modal');

		modal.style.display = 'block';
	}

	/* Handle change in login input */
	handleChange(e){
		this.setState(
			{
				[e.target.name]: e.target.value
			}
		)
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
				.catch(err =>{
					alert(err);
				});
		}
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
