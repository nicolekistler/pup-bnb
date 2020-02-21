import React, { Component } from 'react';
import NavHeader from './NavHeader';
import withAuth from './withAuth';
import AuthService from '../services/AuthService';
import BookingService from '../services/BookingService';
import '../styles/MyBookings.css';
import Spinner from './Spinner';
import tripsIllustration from '../assets/trips-illustration.jpg'
import listingData from '../data/ListingData';

class MyBookings extends Component {
	constructor(props) {
		super(props);

		document.title = `Upcoming • Pupbnb`;

		this.state = {
			bookings: '',
			fetchInProgress: true
		};

		this.Auth    = new AuthService();
		this.Booking = new BookingService();
	}

	componentDidMount() {
		this.Booking.getBookings()
			.then(data => {
				let bookings = [];

				let userBookings = data.booking;

				userBookings.forEach(booking => {
					const result = listingData.find(data => data.id === booking.listingId);
					
					result.startDate = booking.startDate;
					result.endDate   = booking.endDate;
					
					bookings.push(result);
				});
				
				this.setState({
					bookings: bookings,
					fetchInProgress: false
				});
			});
	}
	
	render() {
		return (
			<div>
				<NavHeader/>
				<div id='my-bookings-container'>
					<div id='upcoming-container'>
						<h2>Hello, Name!</h2>
						Check out your upcoming trips
						{ this.state.fetchInProgress ? 
							<Spinner /> : this.renderBookings()
						}
					</div>
					<img alt={''} src={tripsIllustration}/>
				</div>
			</div>
		);
	}

	renderBookings() {
		const result = [];

		let bookings = this.state.bookings;

		bookings.forEach(booking => {
			result.push(
				<div key={Math.floor(100000 + Math.random() * 900000)}>
					{booking.name}
					{booking.startDate}
					{booking.endDate}
				</div>
			);
		})

		return result;

	}
}

export default withAuth(MyBookings);
