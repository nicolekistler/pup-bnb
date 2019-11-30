import React, { Component } from 'react';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import { Link } from 'react-router-dom';
import '../styles/NavHeader.css';

class NavHeader extends Component {
	constructor(props) {
		super(props);

		this.showLoginModal = this.showLoginModal.bind(this);
	}

	showLoginModal(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		modal.style.display = 'block';
	}

	showRegistrationModal(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		modal.style.display = 'block';
	}

	render() {
		return (
			<div className='navbar'>
				<a href='/' onClick={this.showRegistrationModal}>Sign Up</a>
				<a href='/' onClick={this.showLoginModal}>Login</a>
				<Link to="/mybookings">My Bookings</Link>
				<a href='/'>Home</a>
			<LoginModal/>
			<RegistrationModal/>
			</div>

		);
	}
}

export default NavHeader;
