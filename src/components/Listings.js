import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import Map from './Map';
import Listing from './Listing';

class Listings extends Component {
	constructor(props) {
		super(props);

		if(!this.props.history.location.state) {
			this.props.history.location.state = {
				place_id  : '',
				place_lat : '',
				place_lng : ''
			}
		}

		this.state = {
			fetchInProgress : true,
			listings        : '',
			place_id        : '',
			place_lat       : '',
			place_lng       : ''
		};

		this.handlePlace = this.handlePlace.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const place_id  = this.props.history.location.state.place_id;
		const place_lat = this.props.history.location.state.place_lat;
		const place_lng = this.props.history.location.state.place_lng;

		this.fetchListings(place_id, place_lat, place_lng);
	}

	handlePlace(place_id, place_lat, place_lng) {
		this.setState({
			place_id  : place_id,
			place_lat : place_lat,
			place_lng : place_lng
		});

		this.fetchListings(place_id, place_lat, place_lng);
	}

	handleClick() {
		const place_id  = this.state.place_id;
		const place_lat = this.state.place_lat;
		const place_lng = this.state.place_lng;

		this.fetchListings(place_id, place_lat, place_lng);
	}

	fetchListings(place_id, place_lat, place_lng) {
		fetch('http://nameless-shore-23594.herokuapp.com/listings')
			.then(res => res.json())
			.then((data) => {
				let filtered = data.filter((listing) => {
					return listing.place_id === place_id;
				});

				this.setState({
					listings        : filtered,
					fetchInProgress : false,
					place_id        : place_id,
					place_lat       : place_lat,
					place_lng       : place_lng
				});
			})
			.catch(console.log('catch'));
	}

	render() {
		let filtered_listings = [];

		if(this.state.listings) {
			filtered_listings = this.state.listings;
		}

		let mapped_listings = filtered_listings.map(listing => (
			<Listing listing={listing} key={listing.id}/>
		));

		if(mapped_listings.length === 0) {
			mapped_listings = `No pupbnbs for u :(`;
		}

		return (
			<div id='search-form'>
				<br/>
				<SearchBar onSelectPlace={this.handlePlace}/>
				<button onClick={this.handleClick}>Search</button>

				<ul>
					{this.state.fetchInProgress ?
						<Spinner /> :
						<div>
							<h1>Listings</h1>
							{mapped_listings}
							<h1>Map</h1>
							<Map place_lat={this.state.place_lat} place_lng={this.state.place_lng} />
						</div>

					}
				</ul>
			</div>
		);
	}

}

export default Listings;
