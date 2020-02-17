import React, { Component }  from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import '../styles/Listings.css';

class Spinner extends Component {
	constructor(props) {
		super(props);

		this.state = {loading: true};
	}

	render() {
		return (
			<div className='listings-container'>
				<div className='results-container'>
					<BeatLoader
						sizeUnit={'px'}
						size={15}
						color={'#e0e0e0'}
						loading={this.state.loading}
					/>
			</div>
		</div>
		);
	}
}
export default Spinner;
