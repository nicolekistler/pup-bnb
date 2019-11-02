import React, { Component }  from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';

const override = css`
    display: block;
    border-color: red;
`;

class Spinner extends Component {
	constructor(props) {
		super(props);

		this.state = {loading: true};
	}

	render() {
		return (
		<div className='loading'>
			<BeatLoader
				css={override}
				sizeUnit={'px'}
				size={15}
				color={'#e0e0e0'}
				loading={this.state.loading}
			/>
		</div>
		);
	}
}
export default Spinner;
