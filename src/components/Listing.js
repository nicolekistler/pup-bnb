import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Listing extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Link to={`/listings/${this.props.listing.id}`}>{this.props.listing.name}</Link><br/>
				{this.props.listing.description}
			</div>
		);
	}
}

export default Listing;
