import React, { Component } from 'react';
import { withRouter } from 'react-router';
import '../styles/Listings.css';
import cuppyCake from '../assets/cuppy-cake.jpg';

class Listing extends Component {
	constructor(props) {
		super(props);

		this.handleListingClick = this.handleListingClick.bind(this);
	}

	render() {
		return (
			<div className='listing-container'>
				<div className='listing-container-image'>
					<img src={this.props.listing.images.preview} alt={''} />
				</div>
				<div className='listing-container-section'>
					<h4>{this.props.listing.type}</h4>
					<a href='/' onClick={this.handleListingClick}>{this.props.listing.name}</a>
					{this.props.listing.city}<br/>
					{`${this.props.listing.price_per_night}/night`}

				</div>
			</div>
		);
	}

	/**
	 * Handle when user clicks on listing
	 * @param  {Object} e Event
	 * @return {Void}
	 */
	handleListingClick(e) {
		e.preventDefault();

		this.props.history.push({
			pathname: '/ListingDetail',
			state: {
				listing : this.props.listing
			}
		});
	}
}

export default withRouter(Listing);
