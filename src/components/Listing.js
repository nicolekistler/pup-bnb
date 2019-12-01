import React, { Component } from 'react';
import { withRouter } from 'react-router';
import '../styles/Listings.css';
import cuppyCake from '../assets/cuppy-cake.jpg';

class Listing extends Component {
	constructor(props) {
		super(props);

		this.handleListingClick = this.handleListingClick.bind(this);
	}

	handleListingClick = e => {
		e.preventDefault();

		this.props.history.push({
			pathname: '/ListingDetail',
			state: {
				listing : this.props.listing
			}
		});
	}

	render() {
		return (
			<div className='listing-container'>
				<div className='listing-container-section'>
					<img src={cuppyCake} alt={''} />
				</div>
				<div className='listing-container-section'>
					<a href='/' onClick={this.handleListingClick}>{this.props.listing.name}</a><br/>
				</div>
			</div>
		);
	}
}

export default withRouter(Listing);
