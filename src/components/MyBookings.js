import React, { Component } from 'react';
import NavHeader from './NavHeader';
import withAuth from './withAuth';
import '../styles/MyBookings.css';

class MyBookings extends Component {

	constructor(props) {
		super(props);

		document.title = `Upcoming • Pupbnb`;
	}

	render() {
		console.log(window.location.pathname);

		return (
			<div>
				<NavHeader/>
				Logged in!!!
			</div>
		);
	}
}

export default withAuth(MyBookings);
