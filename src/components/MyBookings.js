import React, { Component } from 'react';
import NavHeader from './NavHeader';
import withAuth from './withAuth';
import '../styles/MyBookings.css';
import listingData from '../data/ListingData';
import tripsIllustration from '../assets/trips-illustration.jpg'

class MyBookings extends Component {

	constructor(props) {
		super(props);

		document.title = `Upcoming • Pupbnb`;
	}

	render() {
		console.log(listingData[0]);

		return (
			<div>
				<NavHeader/>
				<div id='my-bookings-container'>
					<div id='upcoming-container'>
						<h2>Hello, Andrea!</h2>
						Check out your upcoming trips 🐶
						<div className='upcoming-trip-container'>
						Testing 123
						</div>
						<div className='upcoming-trip-container'>
						Testing 123
						</div>
					</div>
					<img src={tripsIllustration}/>
				</div>
			</div>
		);
	}
}

export default withAuth(MyBookings);
