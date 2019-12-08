/* global google */
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import Map from './Map';
import Listing from './Listing';
import NavHeader from './NavHeader';
import '../styles/Listings.css';
import logo from '../assets/paw-print.png';
import { withRouter } from 'react-router';
import listingData from '../data/ListingData';

class Listings extends Component {
	constructor(props) {
		super(props);

		document.title = 'Stays • Pupbnb';

		this.state = {
			filterInProgress : true,
			listings        : '',
			place_id        : '',
			place_lat       : '',
			place_lng       : ''
		};

		this.handlePlaceChange = this.handlePlaceChange.bind(this);
		this.onClickLogo       = this.onClickLogo.bind(this);
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

		/* On mount, filter listings */
		this.filterListings(placeId, placeLat, placeLng);
	}

	/**
	 * Filter listings using distance
	 * @param  {Number} placeId  Google maps place ID
	 * @param  {Number} placeLat Place latitude
	 * @param  {Number} placeLng Place longitude
	 * @return {Void}
	 */
	filterListings(placeId, placeLat, placeLng) {
			const filtered = listingData.filter((listing) => {
				const pointA = new google.maps.LatLng(placeLat, placeLng);
				const pointB = new google.maps.LatLng(listing.lat, listing.lng);

				const distance = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB) * 0.000621371;

				console.log('IT WORKED');
				return distance < 50;
			});

			this.setState({
				listings         : filtered,
				filterInProgress : false,
				place_id         : placeId,
				place_lat        : placeLat,
				place_lng        : placeLng
			});
	}

	/**
	 * Create listings index to render
	 * @param  {Array}  filteredListings Listings filtered by searched location
	 * @return {Object} results          JSX of results
	 */
	createListingsIndex(filteredListings) {
		let mappedListings = filteredListings.map(listing => (
			<Listing listing={listing} key={Math.floor(100000 + Math.random() * 900000)}/>
		));

		/* If there are no listings at a given place, return a random suggested place */
		if(!mappedListings.length) {
			const suggestions = ['Manhattan', 'Seoul', 'Tokyo', 'Paris'];
			const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

			mappedListings =
			<div className='listing-container'>
				<br/><br/>
				We couldn't find anything matching your search. Try searching "{randomSuggestion}"
			</div>;
		}

		const results =
			<div className='listings-container'>
				<div className='results-container'>
					<h1>Results</h1>
					{mappedListings}
				</div>
				<div id='map-container'>
					<Map place_lat={this.state.place_lat} place_lng={this.state.place_lng} listings={mappedListings} />
				</div>
			</div>;

		return results;
	}

	/**
	 * Handle when user searches place value
	 * @param  {Number} placeId  Google Maps place ID
	 * @param  {Number} placeLat Place latitude
	 * @param  {Number} placeLng Place longitude
	 * @return {Void}
	 */
	handlePlaceChange(placeId, placeLat, placeLng) {
		this.setState({
			place_id  : placeId,
			place_lat : placeLat,
			place_lng : placeLng
		});

		/* Filter listings */
		this.filterListings(placeId, placeLat, placeLng);
	}

	render() {
		let filteredListings = [];

		if(this.state.listings) {
			filteredListings = this.state.listings;
		}

		const results = this.createListingsIndex(filteredListings);

		return (
			<div id='main-listings-container'>
				<div id='nav-container'>
					<img src={logo} alt={''}  onClick={this.onClickLogo}/>
					<SearchBar onSelectPlace={this.handlePlaceChange}/>
					<NavHeader show_logo={false}/>
				</div>
				<div>
					{ this.state.filterInProgress ? <Spinner /> : results }
				</div>
			</div>
		);
	}

	onClickLogo() {
		this.props.history.push({
			pathname: '/'
		});
	}
}

export default withRouter(Listings);
