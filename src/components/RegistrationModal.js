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
	}

	handleRegistrationClose(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		modal.style.display = 'none';
	}

	handleRegistrationBGClick(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		if (e.target === modal) {
			modal.style.display = 'none';
		}
	}

	triggerLoginModal(e) {
		e.preventDefault();

		let modal = document.getElementById('registration-modal');

		modal.style.display = 'none';

		modal = document.getElementById('login-modal');

		modal.style.display = 'block';
	}

	handleChange(e){
		this.setState(
			{
				[e.target.name]: e.target.value
			}
		)
	}

	handleRegistration(e){
		e.preventDefault();

		if(this.state.username && this.state.password) {
			this.Auth.signup(this.state.username, this.state.password)
				.then(res => {
					alert('SUCCESS');
					// this.props.history.replace('/Login');
				})
				.catch(err =>{
					alert(err);
				});
		}
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
