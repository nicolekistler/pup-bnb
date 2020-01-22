import React, { Component } from 'react';
import NavHeader from './NavHeader';
import '../styles/MyBookings.css';

class MyBookings extends Component {

	constructor(props) {
		super(props);

		document.title = `Upcoming • Pupbnb`;
	}

	render() {
		return (
			<div>
				<NavHeader/>
				Logged in!!!
			</div>
		);
	}
}

export default MyBookings;
