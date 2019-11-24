/* global google */
import React, { Component } from 'react';
import '../styles/Listings.css';

class Map extends Component {
	constructor(props) {
		super(props);

		this.center = {
			lat : 52.52,
			lng : 13.40
		}

		this.options = {
			center : this.center,
			zoom   : 11,
		}

	}

	componentDidMount() {
		this.map = new google.maps.Map(this.init, this.options);

		this.map.setOptions({
			streetViewControl: false,
			mapTypeControl: false,
			styles: [{
				featureType: 'road',
				elementType: 'labels',
				stylers: [{
					visibility: 'off'
				}]
			}]
		});

		if(this.props.place_lat) {
			const lat = parseFloat(this.props.place_lat);
			const lng = parseFloat(this.props.place_lng);

			this.map.setCenter({
				lat: lat,
				lng: lng
			});
		}

		this.renderMarkers();

	}

	componentDidUpdate() {
		if (this.center.lat !== this.props.place_lat || this.center.lng !== this.props.place_lng) {

			this.map.setCenter({
				lat: this.props.place_lat,
				lng: this.props.place_lng
			});
		}
	}

	renderMarkers() {
		fetch('http://nameless-shore-23594.herokuapp.com/listings')
			.then(res => res.json())
			.then(data => {
				data.forEach(listing => {
					new google.maps.Marker({
						position: {lat: listing.lat,lng: listing.lng},
						map: this.map,
						title: 'Test Marker',
						url: 'google.com'
					});
				});
			})
			.catch(console.log('catch'));
	}

	render() {
		return (
			<div id='listing-map' ref={map => this.init = map}></div>
		);
	}
}

export default Map;
