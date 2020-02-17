import React, { Component } from 'react';
import NavHeader from './NavHeader';
import withAuth from './withAuth';
import AuthService from '../services/AuthService';
import '../styles/MyBookings.css';
import tripsIllustration from '../assets/trips-illustration.jpg'

class MyBookings extends Component {

	constructor(props) {
		super(props);

		document.title = `Upcoming • Pupbnb`;

		this.Auth = new AuthService();

		this.userId = this.Auth.getUserId();
	}
	
	render() {
		return (
			<div>
				<NavHeader/>
				<div id='my-bookings-container'>
					<div id='upcoming-container'>
						<h2>Hello, Andrea!</h2>
						Check out your upcoming trips
						<div className='upcoming-trip-container'>
						Testing 123
						</div>
						<div className='upcoming-trip-container'>
						Testing 123
						</div>
					</div>
					<img alt={''} src={tripsIllustration}/>
				</div>
			</div>
		);
	}
}

export default withAuth(MyBookings);
