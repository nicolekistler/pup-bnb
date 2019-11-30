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

		this.state = {
			fetchInProgress : true,
			listings        : '',
			place_id        : '',
			place_lat       : '',
			place_lng       : ''
		};

		this.handlePlaceChange = this.handlePlaceChange.bind(this);
	}

	componentDidMount() {
		/* Set this to prevent error if user navigates to page without history prop */
		if(!this.props.history.location.state) {
			this.props.history.location.state = {
				place_id  : '',
				place_lat : '',
				place_lng : ''
			}
		}

		const placeId  = this.props.history.location.state.place_id;
		const placeLat = this.props.history.location.state.place_lat;
		const placeLng = this.props.history.location.state.place_lng;

		/* On mount, fetch listings */
		this.fetchListings(placeId, placeLat, placeLng);
	}

	/**
	 * Handle when user searches place value
	 * @param  {Number} placeId
	 * @param  {Number} placeLat
	 * @param  {Number} placeLng
	 * @return {Void}
	 */
	handlePlaceChange(placeId, placeLat, placeLng) {
		this.setState({
			place_id  : placeId,
			place_lat : placeLat,
			place_lng : placeLng
		});

		/* Fetch listings */
		this.fetchListings(placeId, placeLat, placeLng);
	}

	/**
	 * Fetch listings and filter using distance
	 * @param  {Number} placeId
	 * @param  {Number} placeLat
	 * @param  {Number} placeLng
	 * @return {Void}
	 */
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

		/* Render listings index */
		let mapped_listings = filtered_listings.map(listing => (
			<Listing listing={listing} key={listing.id}/>
		));

		/* If there are no listings at a given place, return a suggested place */
		if(!mapped_listings.length) {
			const suggestions = ['Brooklyn', 'Tokyo', 'Paris'];
			const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

			mapped_listings =
			<div className='listing-container'>
				<br/><br/>
				We couldn't find anything matching your search. Try searching "{randomSuggestion}"
			</div>;
		}

		return (
			<div id='main-listings-container'>
				<div id='nav-container'>
					<img src={logo} />
					<SearchBar onSelectPlace={this.handlePlaceChange}/>
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
