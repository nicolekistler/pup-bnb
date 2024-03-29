import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export default function withAuth(AuthComponent) {
	const Auth = new AuthService('http://localhost:8080');

	/* Return AuthWrapped HOC */
	return class AuthWrapped extends Component {
		constructor() {
			super();

			this.state = {
				user: null
			};
		}

		componentDidMount() {
			if (!Auth.loggedIn()) {
				this.props.history.push('/');
			}
			else {
				try {
					const profile = Auth.getProfile();

					this.setState({
						user: profile
					});
				}
				catch(err){
					Auth.logout();
					this.props.history.push('/');
				}
			}
		}

		render() {
			if (this.state.user) {
				return (
					<AuthComponent history={this.props.history} user={this.state.user} />
				)
			}
			else {
				return null;
			}
		}
	}
}
