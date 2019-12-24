import React, { Component } from 'react';
import NavHeader from './NavHeader';
import '../styles/ListingDetail.css';

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
		const listing = this.state.listing;

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
		return <div id='image-container'>
			<img src='https://i.imgur.com/9E9IiXd.jpg' alt={''} />
			<img src='https://i.imgur.com/B5It0If.jpg' alt={''} />
			<img src='https://i.imgur.com/TtHZRLv.jpg' alt={''} />
			<img src='https://i.imgur.com/LfzkEQh.jpg' alt={''} />
		</div>;
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
						<h1>{listing.name}</h1>
					</div>
					<div id='description-profile'>
							<img src='https://i.imgur.com/L7tks5k.png' alt={''} />
							<br/>
							{listing.type}
					</div>
				</div>
				<div>
					<br/>
					<img src="https://i.imgur.com/wFoW6qn.png"/> {listing.city}
					<br/>
					<br/>
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
		return (
			<div className='description-section'>
				<h4>Amenities</h4><br/>
				<div className='amenity'></div>

				{/* // https://i.imgur.com/gfuFGui.png spa
				// https://i.imgur.com/i6UBNP3.png wifi
				// https://i.imgur.com/bTLt3sl.png treats
				// https://i.imgur.com/1PpTdML.png sock */}

				Blah blah
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
