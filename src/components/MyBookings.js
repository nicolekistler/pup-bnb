import React, { Component } from 'react';
import NavHeader from './NavHeader';
import withAuth from './withAuth';
import AuthService from '../services/AuthService';
import BookingService from '../services/BookingService';
import '../styles/MyBookings.css';
import Spinner from './Spinner';
import listingData from '../data/ListingData';
import moment from 'moment';

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
		this.populateBookings();
	}
	
	render() {
		return (
			<div>
				<NavHeader/>
				<div id='my-bookings-container'>
					<div id='upcoming-container'>
						<h2>Welcome back!</h2>
						{ this.state.fetchInProgress ? 
							<Spinner /> : this.renderBookings()
						}
					</div>
				</div>
			</div>
		);
	}

	/* Render bookings */
	renderBookings() {
		let result = [];

		let bookings = this.state.bookings;

		if(bookings.length) {
			result.push(<div>Check out your upcoming trips:</div>);
		}
		else {
			result.push(<div>No upcoming trips</div>);
		}

		bookings.forEach(booking => {
			if(moment(booking.startDate).isSameOrAfter(moment().format('YYYY-MM-DD'))) {
				const startDate = moment(booking.startDate).format('MMMM Do, YYYY');
				const endDate = moment(booking.endDate).format('MMMM Do, YYYY');
	
				result.push(
					<div className='upcoming-trip-container'
						key={Math.floor(100000 + Math.random() * 900000)}>
							<img src={booking.preview_img} alt={''} />
							<div id='booking-details'>
								<span id='booking-name'>{booking.name}</span>
								<span id='booking-dates'>Trip date: {startDate} to {endDate}</span>
							</div>
							
					</div>
				);
			}
		});

		return result;

	}

	/* Get and filter user bookings */
	populateBookings() {
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

				bookings.sort(function (a, b) {
					return new Date(a.startDate) - new Date(b.startDate);
				});
		
				bookings = [...new Set(bookings)];
				
				this.setState({
					bookings: bookings,
					fetchInProgress: false
				});
			});
	}
}

export default withAuth(MyBookings);
