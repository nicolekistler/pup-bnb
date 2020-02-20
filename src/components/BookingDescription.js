import React, { Component, Fragment } from 'react';
import '../styles/ListingDetail.css';

class ListingDetail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let listing = this.props.listing;

		return (
            <Fragment>
                {this.renderDescription(listing)}
            </Fragment>
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
				<div className='amenity' key={Math.floor(100000 + Math.random() * 900000)}>
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
				<div id='review-container' key={Math.floor(100000 + Math.random() * 900000)}>
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
}

export default ListingDetail;
