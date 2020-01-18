import React, { Component } from 'react';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import { Link } from 'react-router-dom';
import '../styles/NavHeader.css';
import logo from '../assets/paw-print.png';
import { withRouter } from 'react-router';

class NavHeader extends Component {
	constructor(props) {
		super(props);

		this.showLoginModal = this.showLoginModal.bind(this);
		this.onClickLogo = this.onClickLogo.bind(this);
	}

	/**
	 * Show login modal
	 * @param {Object} e
	 */
	showLoginModal(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		modal.style.display = 'block';
	}

	/**
	 * Show registration modal
	 * @param {Object} e
	 */
	showRegistrationModal(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		modal.style.display = 'block';
	}

	onClickLogo() {
		this.props.history.push({
			pathname: '/'
		});
	}

	render() {
		let logoDisplay = null;

		if(this.props.show_logo) {
			logoDisplay = <img src={logo} alt={''} onClick={this.onClickLogo}/>;
		}

		return (
			<div className='navbar'>
				{ logoDisplay }
				<a href='/' onClick={this.showRegistrationModal}>Sign Up</a>
				<a href='/' onClick={this.showLoginModal}>Login</a>
				{/* <a href='/' onClick={this.showLoginModal}>Sign Out</a> */}
				{/* <Link to="/mybookings">My Bookings</Link> */}
				<a href='/'>Home</a>
			<LoginModal/>
			<RegistrationModal/>
			</div>

		);
	}
}

NavHeader.defaultProps = {
  show_logo: true
}

export default withRouter(NavHeader);
