import React, { Component } from 'react';
import NavHeader from './NavHeader';
import DateWidget from './DateWidget';
import BookingDescription from './BookingDescription';
import '../styles/ListingDetail.css';
import listingData from '../data/ListingData';
import star from '../assets/star.png';
import AuthService from '../services/AuthService';
import BookingService from '../services/BookingService';

class ListingDetail extends Component {
	constructor(props) {
		super(props);

		document.title = `Listing • Pupbnb`;
		
		this.Auth    = new AuthService();
		this.Booking = new BookingService();

		this.userId = this.Auth.getUserId();

		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		this.state = {
			listing: listingData[0],
			startDate: new Date(),
			endDate: tomorrow,
		};

		this.handleBooking    = this.handleBooking.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		if(!this.props.history.location.state) {
			this.props.history.location.state = {
				listing: ''
			}
		}
		
		if(this.props.history.location.state.listing) {
			this.setState({
				listing: this.props.history.location.state.listing
			});
		}
	}

	render() {
		let listing = this.state.listing;

		return (
			<div id='main_detail_container'>
				<NavHeader/>
				<div id='banner-container'>
					<div id='inner-banner-container'/>
				</div>
				<div id='center-container'>
					<BookingDescription listing={listing}/>
					{this.renderBookingWidget(listing)}
				</div>

			</div>
		);
	}

	handleDateChange(bookingDates = {}) {
		const { startDate, endDate } = bookingDates;

		this.setState({
			startDate: startDate,
			endDate: endDate
		});
	}

	/* Handle user booking */
	handleBooking(e) {
		e.preventDefault();

		if(!this.Auth.loggedIn()) {
			const modal = document.getElementById('login-modal');

			modal.style.display = 'block';

			return;
		}

		this.Booking.book(
			this.userId,
			this.state.listing.id,
			this.state.startDate,
			this.state.endDate
		)
			.then(res => {
				this.props.history.push('/MyBookings');
			})
			.catch(err => {
				console.log('error occurred');
			});
	}

	/**
	 * Render booking widget
	 * @param {Object} listing
	 */
	renderBookingWidget(listing) {
		return (
			<div id='book-listing-container'>
				<div id='reserve-info'>
					<span id='listing-price'>{listing.price_per_night}</span><span className='info-small'> per night</span><br/>
					<span className='info-small'><img src={star} alt={''}/> 4.5 (2 Reviews)</span><br/>
				</div>
				<div id='reserve-date'>
					<label>Dates</label> 
						<DateWidget bookingDates={this.handleDateChange}/>
					</div>
					<button id='reserve-button' onClick={this.handleBooking}>
						<b>Reserve</b>
					</button>
				<label id='demo-label'>Demo purposes only</label>
			</div>
		);
	}
}

export default ListingDetail;
