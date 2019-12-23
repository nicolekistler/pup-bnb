import React, { Component } from 'react';
import NavHeader from './NavHeader';
import logo from '../assets/paw-print.png';
import '../styles/ListingDetail.css';

class ListingDetail extends Component {
	constructor(props) {
		super(props);

		document.title = `Listing • Pupbnb`;

		if(!this.props.history.location.state) {
			this.props.history.location.state = {
				listing: ''
			}
		}

		this.state = {
			listing: ''
		}
	}

	componentDidMount() {
		this.setState({
			listing: this.props.history.location.state.listing
		});
	}

	render() {
		const listing = this.state.listing;

		return (
			<div id='main_detail_container'>
				<div id='nav-container'>
					<img src={logo} alt={''}  onClick={this.onClickLogo}/>
					<NavHeader show_logo={false}/>
				</div>
				<div id='image-container'>
					<div id='left-img'>
					</div>
					<div id='right-img'>
					</div>
				</div>
				<div id='center-container'>
				<div id='listing-description-container'>
					<div id='description-top-section'>
						<div id='description-title'>
							<h1>{listing.name}</h1>
						</div>
						<div id='description-profile'>
								<img src='https://i.imgur.com/0HuzCyw.png' alt={''} />
								<br/>
								{listing.host_name}
						</div>
					</div>
					<br/>
					{listing.city}
					<br/>
					<br/>
					{listing.type}
					<div className='description-section'>
						{listing.description}
					</div>
				</div>
				<div id='book-listing-container'>

				</div>
				</div>
			</div>
		);
	}
}

export default ListingDetail;
