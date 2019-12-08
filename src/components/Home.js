import React, { Component }  from 'react';
import SearchForm from './SearchForm';
import NavHeader from './NavHeader';
import '../styles/Home.css';

class Home extends Component {
	constructor(props) {
		super(props);

		document.title = `Pup Rentals, Adventures, and Treats`;
	}

	render() {
		return (
			<div id='home'>
				<NavHeader/>
				<SearchForm/>
			</div>
		);
	}

}
export default Home;
