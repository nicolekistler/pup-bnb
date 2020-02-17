import React, { Component }  from 'react';
import 'react-dates/initialize';
import SearchBar from './SearchBar';
import { withRouter } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import DateWidget from './DateWidget';
import '../styles/SearchForm.css';

class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			place_id  : '',
			place_lat : '',
			place_lng : ''
		}

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handlePlace   = this.handlePlace.bind(this);
		this.handleSubmit  = this.handleSubmit.bind(this);
	}

	/* Handle user changing search place */
	handlePlace(placeId, placeLat, placeLng) {
		this.setState({
			place_id  : placeId,
			place_lat : placeLat,
			place_lng : placeLng
		});
	}

	/* Handle user submit */
	handleSubmit(e) {
		e.preventDefault();

		this.props.history.push({
			pathname: '/listings',
			state: {
				place_id  : this.state.place_id,
				place_lat : this.state.place_lat,
				place_lng : this.state.place_lng
			}
		});
	}

	/* Handle enter key */
	handleKeyDown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();

			if(this.state.place_id) {
				this.props.history.push({
					pathname: '/listings',
					state: {
						place_id  : this.state.place_id,
						place_lat : this.state.place_lat,
						place_lng : this.state.place_lng
					}
				});
			}
			else {
				document.getElementById('autocomplete').focus();
			}
		}
	}

	render() {
		return (
			<div id='search-container'>
				<div id='message-container'>
					<h5>Book unique places for your dog to stay.</h5>
				</div>
				<div id='form-container'>
					<form onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown}>
						<label>WHERE</label><br/>
						<SearchBar placeSelected={this.handlePlace}/>

						<label>WHEN</label><br/>
						<DateWidget/>

						<button id='search-form-submit'>
							<b>Search</b>
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(SearchForm);
