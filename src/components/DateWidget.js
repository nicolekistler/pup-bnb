import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Component } from 'react';

class DateWidget extends Component {
	constructor(props) {
		super(props);

		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		this.state = {
			startDate : new Date(),
			endDate   : tomorrow
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange   = this.handleEndDateChange.bind(this);
	}

	/* Handle widget start date changes */
	handleStartDateChange(date) {
		this.setState({
			startDate: date
		});

		if(date > this.state.endDate) {
			this.setState({
				endDate: date
			});
		}

		this.props.bookingDates({
			startDate: this.state.startDate,
			endDate: this.state.endDate
		});
	};

	/* Handle widget end date changes */
	handleEndDateChange(date) {
		this.setState({
			endDate: date
		});

		this.props.bookingDates({
			startDate: this.state.startDate,
			endDate: this.state.endDate
		});
	};

	render() {
		return (
			<div id='date-picker-container'>
				<DatePicker
					selectsStart
					selected={this.state.startDate}
					onChange={this.handleStartDateChange}
					minDate={new Date()}
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
