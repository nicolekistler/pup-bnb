import React, { Component } from 'react';
import NavHeader from './NavHeader';
import withAuth from './withAuth';
import AuthService from '../services/AuthService';
import BookingService from '../services/BookingService';
import '../styles/MyBookings.css';
import Spinner from './Spinner';
import tripsIllustration from '../assets/trips-illustration.jpg'

class MyBookings extends Component {

	constructor(props) {
		super(props);

		document.title = `Upcoming • Pupbnb`;

		this.state = {
			bookings: '',
			fetchInProgress: true
		};

		this.Auth = new AuthService();
		this.Booking = new BookingService();

		this.userId = this.Auth.getUserId();
	}

	componentDidMount() {
		this.Booking.getBookings()
			.then(data => {
				this.setState({
					bookings: data.booking,
					fetchInProgress: false
				});
			});
	}
	
	render() {
		console.log(this.state);

		const results =
			<div className='upcoming-trip-container'>
				Testing 123
			</div>;

		return (
			<div>
				<NavHeader/>
				<div id='my-bookings-container'>
					<div id='upcoming-container'>
						<h2>Hello, Name!</h2>
						Check out your upcoming trips
						{ this.state.fetchInProgress ? <Spinner /> : results }
					</div>
					<img alt={''} src={tripsIllustration}/>
				</div>
			</div>
		);
	}
}

export default withAuth(MyBookings);
