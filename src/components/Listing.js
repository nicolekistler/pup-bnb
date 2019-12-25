import React, { Component } from 'react';
import { withRouter } from 'react-router';
import '../styles/Listings.css';

class Listing extends Component {
	constructor(props) {
		super(props);

		this.handleListingClick = this.handleListingClick.bind(this);
	}

	render() {
		return (
			<div className='listing-container' onClick={this.handleListingClick}>
				<div className='listing-container-image'>
					<img src={this.props.listing.preview_img} alt={''} />
				</div>
				<div className='listing-container-section'>
					{this.props.listing.type}
					<a href='/' onClick={this.handleListingClick}>{this.props.listing.name}</a>
					<h5>{this.props.listing.city}</h5><br/><br/>
				</div>
					<div id='price_nightly'>{`${this.props.listing.price_per_night}/night`}</div>
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
