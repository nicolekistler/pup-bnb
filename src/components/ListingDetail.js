import React, { Component } from 'react';
import NavHeader from './NavHeader';

class ListingDetail extends Component {
	constructor(props) {
		super(props);

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
			<div>
				<NavHeader/>
				<h3>{listing.name}</h3>
				<h5>{listing.description}</h5>
				<h5>{listing.price_per_night}</h5>
				<button>Book this listing</button>
			</div>
		);
	}
}

export default ListingDetail;
