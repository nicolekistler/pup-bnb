/* global google */
import React, { Component }  from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			place: '',
			lat: '',
			lng: ''
		}

		this.autocompleteInput  = React.createRef();
		this.autocomplete       = null;
		this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
		this.handleKeyDown      = this.handleKeyDown.bind(this);
	}

	componentDidMount() {
		this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
			{'types': ['geocode']});

		this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
	}

	handlePlaceChanged() {
		const place    = this.autocomplete.getPlace();

		const place_id = place.place_id;

		if(place_id) {
			const place_lat = place.geometry.location.lat();
			const place_lng = place.geometry.location.lng();

			this.setState({
				place : place_id,
				lat   : place_lat,
				lng   : place_lng
			});

			this.props.onSelectPlace(place_id, place_lat, place_lng);
		}
	}

	handleKeyDown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	render() {
		return (
			<input ref={this.autocompleteInput} id='autocomplete' placeholder='Somewhere'
			type='text' onKeyDown={this.handleKeyDown}></input>
		);
	}
}
export default SearchBar;
