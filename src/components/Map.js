import React, { Component }  from 'react';
/* global google */

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
			styles: [{
				featureType: 'road',
				elementType: 'labels',
				stylers: [{
					visibility: 'off'
				}]
			}]
		});

		this.map.setCenter({
			lat: this.props.place_lat,
			lng: this.props.place_lng
		});
	}

	componentDidUpdate() {
		if (this.center.lat !== this.props.place_lat || this.center.lng !== this.props.place_lng) {

			this.map.setCenter({
				lat: this.props.place_lat,
				lng: this.props.place_lng
			});
		}
	}

	render() {
		return (
			<div id='listing-map' ref={map => this.init = map}></div>
		);
	}
}

export default Map;
