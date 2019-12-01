import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Listings from './components/Listings';
import ListingDetail from './components/ListingDetail';
import MyBookings from './components/MyBookings';

function App() {
	return (
		<div className='App'>
			<Router>
				<div>
					<Route exact path='/' component={Home} />
					<Route exact path='/Listings' component={Listings}/>
					<Route exact path='/ListingDetail' component={ListingDetail}/>
					<Route exact path='/MyBookings' component={MyBookings}/>
				</div>
			</Router>
		</div>
	);
}

export default App;
