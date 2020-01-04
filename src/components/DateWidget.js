import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Component } from 'react';

class DateWidget extends Component {
	constructor(props) {
		super(props);

		let tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		this.state = {
			startDate : new Date(),
			endDate   : tomorrow
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange   = this.handleEndDateChange.bind(this);
		console.log('test');
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

	render() {
		console.log('test');

		return (
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
		);
	}

}
export default DateWidget;