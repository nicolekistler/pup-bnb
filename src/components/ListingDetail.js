import React, { Component } from 'react';
import NavHeader from './NavHeader';
import DateWidget from './DateWidget';
import '../styles/ListingDetail.css';
import listingData from '../data/ListingData';
import star from '../assets/star.png';
import AuthService from './AuthService';

class ListingDetail extends Component {
	constructor(props) {
		super(props);

		document.title = `Listing • Pupbnb`;

		if(!this.props.history.location.state) {
			this.props.history.location.state = {
				listing: ''
			}
		}

		this.state = {
			listing: ''
		}

		this.handleBooking = this.handleBooking.bind(this);
		this.Auth          = new AuthService();
	}

	componentDidMount() {
		this.setState({
			listing: this.props.history.location.state.listing
		});
	}

	handleBooking(e) {
		e.preventDefault();

		if(!this.Auth.loggedIn()) {
			const modal = document.getElementById('login-modal');

			modal.style.display = 'block';

			return;
		}

		this.props.history.push('/MyBookings');
	}

	render() {
		let listing = this.state.listing;

		if(!listing) {
			listing = listingData[0];
		}

		return (
			<div id='main_detail_container'>
				<NavHeader/>

				<div id='banner-container'>
					<div id='inner-banner-container'/>
				</div>

				<div id='center-container'>
					{this.renderDescription(listing)}
					{this.renderBookingWidget(listing)}
				</div>

			</div>
		);
	}

	/**
	 * Render listing description
	 * @param {Object} listing
	 */
	renderDescription(listing) {
		return (
			<div id='listing-description-container'>
				{this.renderTopSection(listing)}

				{this.renderAmenities()}

				{this.renderReviews(listing)}
			</div>
		);
	}

	/**
	 * Render listing top section
	 * @param {Object} listing
	 */
	renderTopSection(listing) {
		return (
			<div>
				<div id='description-top-section'>
					<div id='description-title'>
						{listing.name}
					</div>
					<div id='description-profile'>
							<img src='https://i.imgur.com/L7tks5k.png' alt={''} />
							<br/>
							{listing.type}
					</div>
				</div>
				<div className='description-headline'>
					<img src='https://i.imgur.com/wFoW6qn.png' alt={''}/> {listing.city}
				</div>
				<div className='description-headline'>
					<img src='https://i.imgur.com/b2Wlh9z.png' alt={''}/> Hosted by {listing.host_name} J.
				</div>

				<div className='description-section'>
					<h4>Description</h4><br/>
					{listing.description}
				</div>
			</div>
		);
	}

	/* Render amenities */
	renderAmenities() {
		const amenitySection = [];

		const amenities = [{
				img: 'https://i.imgur.com/U3f1Mbc.png',
				name: 'Spa',
			},
			{
				img: 'https://i.imgur.com/M95H2hg.png',
				name: 'Wifi',
			},
			{
				img: 'https://i.imgur.com/dIJUW36.png',
				name: 'Treats',
			},
			{
				img: 'https://i.imgur.com/PYxAqhk.png',
				name: 'Socks',
			}
		];

		amenities.forEach(amenity => {
			amenitySection.push(
				<div className='amenity'>
					<img src={amenity.img} alt={''}/> {amenity.name}
				</div>
			);
		});

		return (
			<div className='description-section'>
				<h4>Amenities</h4>
				<div id='amenities'>
					{amenitySection}
				</div>

			</div>
		);
	}

	/**
	 * Render reviews
	 * @param {Object} listing
	 */
	renderReviews(listing) {
		const reviews = [];

		listing.reviews.forEach(review => {
			reviews.push(
				<div id='review-container'>
					<div id='review-top'>
						<div>
							<img src='https://i.imgur.com/MOGJayg.png' alt={''}/>
						</div>
						<div>
							<span>{review.name}</span>
							<span>{review.date}</span>
						</div>
					</div>
					<span>{review.description}</span>

				</div>
			);
		});

		return (
			<div>
				<div className='description-section'>
					<h4>Reviews</h4><br/>
						{reviews}
				</div>

				<div className='description-section'>
					<h4>Cancellations</h4><br/>
					Free cancellation for 48 hours.
					After that, cancel up to 24 hours before check-in and get a full refund,
					minus the service fee.
				</div>
			</div>
		);
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
						<DateWidget/>
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
