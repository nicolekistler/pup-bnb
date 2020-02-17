import React, { Component, Fragment } from 'react';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import { Link } from 'react-router-dom';
import '../styles/NavHeader.css';
import logo from '../assets/paw-print.png';
import { withRouter } from 'react-router';
import AuthService from './AuthService';

class NavHeader extends Component {
	constructor(props) {
		super(props);

		this.showLoginModal = this.showLoginModal.bind(this);
		this.onClickLogo = this.onClickLogo.bind(this);

		this.handleLogout = this.handleLogout.bind(this);
		this.Auth = new AuthService();
	}

	/* Show login modal */
	showLoginModal(e) {
		e.preventDefault();

		const modal = document.getElementById('login-modal');

		modal.style.display = 'block';
	}

	/* Show registration modal */
	showRegistrationModal(e) {
		e.preventDefault();

		const modal = document.getElementById('registration-modal');

		modal.style.display = 'block';
	}

	/* Handle user logging out */
	handleLogout(e){
		e.preventDefault();

		this.Auth.logout();

		this.props.history.push('/');
	}

	/* Redirect user to home page when they click the logo */
	onClickLogo() {
		this.props.history.push({
			pathname: '/'
		});
	}

	render() {
		let logoDisplay, links = null;

		if(this.props.show_logo) {
			logoDisplay = <img src={logo} alt={''} onClick={this.onClickLogo}/>;
		}

		if(this.Auth.loggedIn()) {
			links =
			<Fragment>
				<a href='/' onClick={this.handleLogout}>Sign Out</a>
				<Link to='/mybookings'>My Bookings</Link>
				<a href='/'>Home</a>
			</Fragment>;
		}
		else {
			links =
			<Fragment>
				<a href='/' onClick={this.showRegistrationModal}>Sign Up</a>
				<a href='/' onClick={this.showLoginModal}>Login</a>
				<a href='/'>Home</a>
			</Fragment>;
		}

		return (
			<div className='navbar'>
				{ logoDisplay }
				{ links }
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
