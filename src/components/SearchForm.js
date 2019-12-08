import React, { Component }  from 'react';
import 'react-dates/initialize';
import SearchBar from './SearchBar';
import { withRouter } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class SearchForm extends Component {
	constructor(props) {
		super(props);

		let tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		this.state = {
			startDate : new Date(),
			endDate   : tomorrow,
			place_id  : '',
			place_lat : '',
			place_lng : ''
		}

		this.handlePlace           = this.handlePlace.bind(this);
		this.handleSubmit          = this.handleSubmit.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange   = this.handleEndDateChange.bind(this);
	}

	handlePlace(placeId, placeLat, placeLng) {
		this.setState({
			place_id  : placeId,
			place_lat : placeLat,
			place_lng : placeLng
		});
	}

	handleStartDateChange(date) {
		this.setState({
			startDate: date
		});

		if(date > this.state.endDate) {
			this.setState({
				endDate: date
			});
		}
	};

	handleEndDateChange(date) {
		this.setState({
			endDate: date
		});
	};

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

	render() {
		return (
			<div id='search-container'>
				<div id='message-container'>
					<h5>Book unique places for your dog to stay.</h5>
				</div>
				<div id='form-container'>
					<form onSubmit={this.handleSubmit}>
						<label>WHERE</label><br/>
						<SearchBar onSelectPlace={this.handlePlace}/>

						<label>WHEN</label><br/>
						<div id='date-picker-container'>
							<DatePicker
								selectsStart
								selected={this.state.startDate}
								onChange={this.handleStartDateChange}
							/>
							<DatePicker
								selectsEnd
								selected={this.state.endDate}
								onChange={this.handleEndDateChange}
								minDate={this.state.startDate}
							/>
						</div>

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
