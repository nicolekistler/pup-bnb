import React, { Component }  from 'react';
import 'react-dates/initialize';
import SearchBar from './SearchBar';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { withRouter } from 'react-router';

class SearchForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			startDate : null,
			endDate   : null,
			place_id  : '',
			place_lat : '',
			place_lng : ''
		}

		this.handlePlace = this.handlePlace.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handlePlace = (place_id, place_lat, place_lng) => {
		console.log('TEST');
		console.log(place_lat, place_lng);

		this.setState({
			place_id  : place_id,
			place_lat : place_lat,
			place_lng : place_lng
		});
	}

	handleSubmit = (e) => {
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

	render() {
		return (
		<div id='home-search-container'>
			<div id='home-welcome-container'>
			<h1 id='welcome-message'>
				Book unique places for your dog to stay.
			</h1>
			</div>

			<form id='search-form' onSubmit={this.handleSubmit}>
				<div>
					<label>WHERE</label>
					<SearchBar onSelectPlace={this.handlePlace}/>
				</div>
					<label>WHEN</label><br/>
					<DateRangePicker
						startDate={this.state.startDate}
						startDateId='start-date-picker'
						endDate={this.state.endDate}
						endDateId='end-date-picker'
						onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
						focusedInput={this.state.focusedInput}
						onFocusChange={focusedInput => this.setState({ focusedInput })}
						noBorder={true}
						readOnly={true}
					/>

				<button id='search-form-submit'>
					<b>Search</b>
				</button>

			</form>
		</div>
		);
	}
}

export default withRouter(SearchForm);
