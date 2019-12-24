import React, { Component } from 'react';
import NavHeader from './NavHeader';
import '../styles/ListingDetail.css';
import listingData from '../data/ListingData';

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
	}

	componentDidMount() {
		this.setState({
			listing: this.props.history.location.state.listing
		});
	}

	render() {
		let listing = this.state.listing;

		if(!listing) {
			listing = listingData[0];
		}

		return (
			<div id='main_detail_container'>
				<NavHeader/>
				{this.renderBanner()}

				<div id='center-container'>
					{this.renderDescription(listing)}
					{this.renderBookingWidget(listing)}
				</div>

			</div>
		);
	}

	/**
	 *
	 */
	renderBanner() {
		const banner = [];

		const bannerImages = [
			'https://i.imgur.com/9E9IiXd.jpg',
			'https://i.imgur.com/B5It0If.jpg',
			'https://i.imgur.com/TtHZRLv.jpg',
			'https://i.imgur.com/LfzkEQh.jpg'
		];

		bannerImages.forEach(image => {
			banner.push(<img src={image} alt={''} />);
		});

		return (
			<div id='image-container'>
				{banner}
			</div>
		);
	}

	/**
	 *
	 * @param {*} listing
	 */
	renderDescription(listing) {
		return (
			<div id='listing-description-container'>
				{this.renderMainSection(listing)}

				{this.renderAmenities()}

				{this.renderReviews()}
			</div>
		);
	}

	/**
	 *
	 * @param {*} listing
	 */
	renderMainSection(listing) {
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
					<img src="https://i.imgur.com/wFoW6qn.png" alt={''}/> {listing.city}
				</div>
				<div className='description-headline'>
					<img src="https://i.imgur.com/b2Wlh9z.png"/> Hosted by {listing.host_name} J.
				</div>

				<div className='description-section'>
					<h4>Description</h4><br/>
					{listing.description}
				</div>
			</div>
		);
	}

	/**
	 *
	 */
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
	 *
	 */
	renderReviews() {
		return (
			<div className='description-section'>
				<h4>Reviews</h4><br/>
				Bloop bloop
			</div>
		);
	}

	/**
	 *
	 * @param {*} listing
	 */
	renderBookingWidget(listing) {
		return (
			<div id='book-listing-container'>
				Price: {listing.price_per_night} per night<br/>
				4.75 (5 reviews)<br/>
				<button>
					<b>Reserve</b>
				</button>
			</div>
		);
	}
}

export default ListingDetail;
