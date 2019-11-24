/* global google */
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import Map from './Map';
import Listing from './Listing';
import NavHeader from './NavHeader';
import '../styles/Listings.css';
import logo from '../assets/paw-print.png';

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
		const placeId  = this.props.history.location.state.place_id;
		const placeLat = this.props.history.location.state.place_lat;
		const placeLng = this.props.history.location.state.place_lng;

		this.fetchListings(placeId, placeLat, placeLng);
	}

	handlePlace(placeId, placeLat, placeLng) {
		this.setState({
			place_id  : placeId,
			place_lat : placeLat,
			place_lng : placeLng
		});

		this.fetchListings(placeId, placeLat, placeLng);
	}

	handleClick() {
		const placeId  = this.state.place_id;
		const placeLat = this.state.place_lat;
		const placeLng = this.state.place_lng;

		this.fetchListings(placeId, placeLat, placeLng);
	}

	fetchListings(placeId, placeLat, placeLng) {
		fetch('http://nameless-shore-23594.herokuapp.com/listings')
			.then(res => res.json())
			.then((data) => {
				let filtered = data.filter((listing) => {
					const pointA = new google.maps.LatLng(placeLat, placeLng);
					const pointB = new google.maps.LatLng(listing.lat, listing.lng);

					const distance = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB) * 0.000621371;

					return distance < 50;
				});

				this.setState({
					listings        : filtered,
					fetchInProgress : false,
					place_id        : placeId,
					place_lat       : placeLat,
					place_lng       : placeLng
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

		if(!mapped_listings.length) {
			const suggestions = ['Brooklyn', 'Tokyo', 'Paris'];
			const rand_suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

			mapped_listings =
			<div className='listing-container'>
				We couldn't find anything matching your search. Try searching "{rand_suggestion}"
			</div>;
		}

		return (
			<div id='main-listings-container'>
				<div id='nav-container'>
					<img src={logo} />
					<SearchBar onSelectPlace={this.handlePlace}/>
					<NavHeader/>
				</div>
				<div>
					{ this.state.fetchInProgress ?
						<Spinner /> :
						<div className='listings-container'>
							<div className='results-container'>
								<h1>Results</h1>
								{mapped_listings}
							</div>
							<div id='map-container'>
								<Map place_lat={this.state.place_lat} place_lng={this.state.place_lng} listings={mapped_listings} />
							</div>
						</div>
					}
				</div>
			</div>
		);
	}

}

export default Listings;
